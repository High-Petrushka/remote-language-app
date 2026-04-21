from django.urls import path

from core.lesson.views import LessonList, LessonDetail, like_lesson_view, remove_like_view, check_solution_view


urlpatterns = [
    path("lessons/", LessonList.as_view(), name="lessons"),
    path("lessons/<int:pk>/", LessonDetail.as_view(), name="lesson-detail"),
    path("lessons/<int:lesson_pk>/like/", like_lesson_view, name="like-lesson"),
    path("lessons/<int:lesson_pk>/remove_like/", remove_like_view, name="remove-like"),
    path("lessons/<int:lesson_pk>/check_test/<int:test_pk>/", check_solution_view, name="check-solution"),
]
