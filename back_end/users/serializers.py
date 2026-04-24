from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfile, Post, Comment
from django.core.validators import validate_email
import re

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirm_password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value

    def validate_email(self, value):
        validate_email(value)

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "As senhas não coincidem."})

        password = attrs['password']
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError({"password": "A senha precisa ter pelo menos uma letra maiúscula."})
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError({"password": "A senha precisa ter pelo menos uma letra minúscula."})
        if not re.search(r'\d', password):
            raise serializers.ValidationError({"password": "A senha precisa ter pelo menos um número."})
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise serializers.ValidationError({"password": "A senha precisa ter pelo menos um caractere especial."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        if not hasattr(user, 'profile'):
            UserProfile.objects.create(user=user)

        return user


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    cover_photo = serializers.ImageField(allow_null=True, required=False)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "full_name",
            "birth_date",
            "phone",
            "profession",
            "linkedin",
            "avatar",
            "cover_photo",
            "bio",
            "status",
            "location",
            "website",
            "is_private",
            "show_email",
            "allow_messages",
            "created_at",
            "followers_count",
            "following_count",
        ]

        read_only_fields = ["id", "username", "created_at"]
    
    def get_followers_count(self, obj):
        return obj.user.followers.count()

    def get_following_count(self, obj):
        return obj.user.following.count()


class PostSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="author.username", read_only=True)
    likes_count = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    author_id = serializers.IntegerField(source="author.id", read_only=True)
    avatar = serializers.ImageField(source="author.profile.avatar", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "author_id",
            "username",
            "avatar",
            "content",
            "image",
            "video",
            "created_at",
            "updated_at",
            "likes_count",
            "liked",
        ]
        read_only_fields = ["id", "author_id", "username", "avatar", "created_at", "updated_at",]
    
    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):
        user = self.context["request"].user
        return obj.likes.filter(user=user).exists()
    
    def validate(self, data):
        content = data.get("content", "").strip()
        image = data.get("image")
        video = data.get("video")

        if not content and not image and not video:
            raise serializers.ValidationError(
                "Você precisa adicionar texto, imagem ou vídeo."
            )

        return data

class SearchUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "full_name"
            "profession",
            "bio",
            "avatar"
        ]

class SimpleUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source="profile.avatar", read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "avatar"]

class UserSearchSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(source="profile.avatar", read_only=True)
    bio = serializers.CharField(source="profile.bio", read_only=True)
    profession = serializers.CharField(source="profile.profession", read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "avatar", "bio", "profession"]

class CommentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Comment
        fields = ["id", "username", "content", "created_at"]