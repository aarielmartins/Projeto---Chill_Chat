from django.urls import path
from .views import FeedView, FollowersListView, FollowingListView, ProfileView, PostListCreateView, LoginView, RegisterView, SearchUsersView, change_password, change_username, create_comment, follow_stats, list_comments, search_users, toggle_follow, toggle_like
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("posts/", PostListCreateView.as_view(), name="post-list-create"),
    path("feed/", FeedView.as_view(), name="feed"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("search/users/", SearchUsersView.as_view(), name="search-users"),
    path("search/", search_users),
    path("follow/<int:user_id>/", toggle_follow),
    path("follow/stats/<int:user_id>/", follow_stats),
    path("following/", FollowingListView.as_view(), name="following"),
    path("followers/", FollowersListView.as_view(), name="followers"),
    path("posts/<int:post_id>/like/", toggle_like),
    path("posts/<int:post_id>/comment/", create_comment),
    path("posts/<int:post_id>/comments/", list_comments),
    path("profile/username/", change_username),
    path("profile/password/", change_password),
]
