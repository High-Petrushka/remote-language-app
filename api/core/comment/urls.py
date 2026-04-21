from django.urls import path

from core.comment.views import CommentList, CommentDetail


urlpatterns = [
    path("lessons/<int:lesson_pk>/comments/", CommentList.as_view(), name="comments"),
    path("lessons/<int:lesson_pk>/comments/<comment_pk>/", CommentDetail.as_view(), name="comment-ditail"),
]