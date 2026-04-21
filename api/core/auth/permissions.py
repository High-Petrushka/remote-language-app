from rest_framework import permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user == obj.owner:
            return True

        return False

class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user == obj:
            return True

        print(obj)
        print(request.user)
        return False


class IsNotBlocked(permissions.BasePermission):
    message="You've been blocked on the platform for a certain reason!"

    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return IsAuthenticatedOrReadOnly
        if request.user.is_active:
            return True

        return False



class CommentPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.method == "PUT":
            return request.user == obj.author
        if request.method == "DELETE":
            return bool(request.user.is_superuser or request.user == obj.author or request.user == obj.lesson.owner)

        return False
