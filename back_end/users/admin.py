from django.contrib import admin
from .models import UserProfile
from .models import Post

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "bio")
    search_fields = ("user__username",)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author", "created_at", "is_active")
    search_fields = ("author__username", "content")
    list_filter = ("is_active", "created_at")
