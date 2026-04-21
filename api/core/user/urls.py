from django.urls import path

from core.user.views import MyUserList, MyUserDetail

urlpatterns = [
    path("users/", MyUserList.as_view(), name="users"),
    path("users/<int:pk>/", MyUserDetail.as_view(), name="user-detail"),
]