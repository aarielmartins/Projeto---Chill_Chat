from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveUpdateAPIView, ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import CommentSerializer, SearchUserSerializer, UserProfileSerializer, PostSerializer, RegisterSerializer, SimpleUserSerializer, UserSearchSerializer
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Follow, Like, Post, UserProfile, Comment
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse

User = get_user_model()

class ProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile
    

    
class PostListCreateView(ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Post.objects
            .filter(is_active=True)
            .select_related("author", "author__profile")
            .order_by("-created_at")
        )
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email e senha são obrigatórios.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'detail': 'Email ou senha incorretos.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.check_password(password):
            return Response({'detail': 'Email ou senha incorretos.'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({'detail': 'Usuário desativado.'}, status=status.HTTP_400_BAD_REQUEST)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        profile_serializer = UserProfileSerializer(user.profile, context={'request': request})

        return Response({
            'access': access_token,
            'refresh': refresh_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'profile': profile_serializer.data
            }
        }, status=status.HTTP_200_OK)

class RegisterView(APIView):
    permission_classes = [AllowAny] 
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        profile = getattr(user, 'profile', None)
        profile_data = UserProfileSerializer(profile, context={'request': request}).data if profile else {}

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        refresh_token = str(refresh)

        return Response({
            'access': access_token,
            'refresh': refresh_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'profile': profile_data
            }
        }, status=status.HTTP_201_CREATED)
    
class FeedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        following_ids = Follow.objects.filter(
            follower=request.user
        ).values_list("following_id", flat=True)

        posts = Post.objects.filter(
            Q(author__id__in=following_ids) | Q(author=request.user),
            is_active=True
        ).order_by("-created_at")

        serializer = PostSerializer(posts, many=True, context={"request": request})
        return Response(serializer.data)

class SearchUsersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        q = request.query_params.get("q", "")

        results = UserProfile.objects.filter(
            user__is_superuser=False,
            user__is_staff=False
        ).exclude(
            user=request.user
        ).filter(
            Q(user__username__icontains=q) |
            Q(full_name__icontains=q) |
            Q(profession__icontains=q) |
            Q(bio__icontains=q)
        )

        serializer = SearchUserSerializer(results, many=True)
        return Response(serializer.data)
    
@api_view(["GET"])
def search_users(request):
    query = request.GET.get("q", "")
    users = User.objects.filter(
        username__icontains=query,
        is_superuser=False,
        is_staff=False
    ).exclude(id=request.user.id)

    serializer = UserSearchSerializer(users, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_follow(request, user_id):
    print("Usuário logado:", request.user.id)
    print("ID recebido na URL:", user_id)
    try:
        user_to_follow = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "Usuário não encontrado"}, status=404)

    if request.user == user_to_follow:
        return Response({"error": "Você não pode seguir a si mesmo"}, status=400)

    follow, created = Follow.objects.get_or_create(
        follower=request.user,
        following=user_to_follow
    )

    if not created:
        follow.delete()
        return Response({"followed": False})

    return Response({"followed": True})

@api_view(["GET"])
def follow_stats(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "Usuário não encontrado"}, status=404)

    followers_count = user.followers.count()
    following_count = user.following.count()

    return Response({
        "followers": followers_count,
        "following": following_count,
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def feed(request):
    following_users = Follow.objects.filter(
        follower=request.user
    ).values_list("following_id", flat=True)

    posts = Post.objects.filter(
        Q(author__id__in=following_users) | Q(author=request.user),
        is_active=True
    ).order_by("-created_at")

    serializer = PostSerializer(posts, many=True, context={"request": request})
    return Response(serializer.data)

class FollowingListView(ListAPIView):
    serializer_class = SimpleUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            User.objects
            .filter(followers__follower=self.request.user)
            .select_related("profile")
        )

class FollowersListView(ListAPIView):
    serializer_class = SimpleUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return (
            User.objects
            .filter(following__following=self.request.user)
            .select_related("profile")
        )

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def toggle_like(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    like, created = Like.objects.get_or_create(
        user=request.user,
        post=post
    )

    if not created:
        like.delete()
        return Response({"liked": False})

    return Response({"liked": True})

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_comment(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user, post=post)
        return Response(serializer.data)

    return Response(serializer.errors, status=400)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def list_comments(request, post_id):
    comments = Comment.objects.filter(post_id=post_id).order_by("-created_at")
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_username(request):
    new_username = request.data.get("username")

    if not new_username:
        return Response({"error": "Username obrigatório"}, status=400)

    if User.objects.filter(username=new_username).exists():
        return Response({"error": "Username já existe"}, status=400)

    request.user.username = new_username
    request.user.save()

    return Response({"success": True})

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def change_password(request):
    password = request.data.get("password")
    confirm = request.data.get("confirm_password")

    if not password:
        return Response({"error": "Senha obrigatória"}, status=400)

    if password != confirm:
        return Response({"error": "Senhas diferentes"}, status=400)

    request.user.set_password(password)  # 🔥 ESSENCIAL
    request.user.save()

    return Response({"success": True})


def health(request):
    return JsonResponse({"status": "ok"})