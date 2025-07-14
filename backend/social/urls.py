from django.urls import path
from . import views

urlpatterns = [
    # Authentication
    path('auth/login/', views.login_view, name='login'),
    path('auth/register/', views.register_view, name='register'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.current_user, name='current-user'),
    
    # Posts
    path('posts/', views.PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', views.PostDetailView.as_view(), name='post-detail'),
    path('posts/<int:post_id>/like/', views.like_post, name='like-post'),
    path('posts/<int:post_id>/share/', views.share_post, name='share-post'),
    path('posts/recent/', views.recent_posts, name='recent-posts'),
    
    # Comments
    path('posts/<int:post_id>/comments/', views.CommentListCreateView.as_view(), name='comment-list-create'),
    
    # User profiles and posts
    path('users/<int:user_id>/posts/', views.UserPostsView.as_view(), name='user-posts'),
    path('users/<int:user_id>/profile/', views.UserProfileView.as_view(), name='user-profile'),
    path('profile/', views.UserProfileView.as_view(), name='my-profile'),
]
