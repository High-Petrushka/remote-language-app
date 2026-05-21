from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.http import Http404

from core.user.models import MyUser
from core.abstract.models import AbstractModel


class Language(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f"{self.name}"


def get_poster_upload_path(instance: Lesson, filename: str) -> str:
    return f"{instance.owner}/lessons/{filename}"


class Lesson(AbstractModel):

    TYPE_CHOICES = {
        1: "reading",
        2: "grammar",
        3: "speaking",
    }

    title = models.CharField(max_length=255)
    type = models.IntegerField(choices=TYPE_CHOICES)
    language = models.ForeignKey(Language, on_delete=models.PROTECT)
    description = models.CharField(max_length=255)
    text = models.TextField()
    poster = models.ImageField(upload_to=get_poster_upload_path, null=True, blank=True)
    owner = models.ForeignKey(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.owner.username}'s {self.title}"

    def get_lesson_type(self, type_id):
        return self.TYPE_CHOICES[type_id]


class Test(models.Model):
    test_lesson = models.OneToOneField(Lesson, on_delete=models.CASCADE)

    def __str__(self):
        return f"test for lesson - {self.test_lesson}"


class Task(models.Model):
    task_test = models.ForeignKey(Test, on_delete=models.CASCADE)
    question = models.CharField(max_length=255)
    answer = models.CharField(max_length=255)
    variant_a = models.CharField(max_length=255)
    variant_b = models.CharField(max_length=255)
    variant_c = models.CharField(max_length=255)
    variant_d = models.CharField(max_length=255)

    def __str__(self):
        return f"task of {self.task_test}"


class SolvedLesson(AbstractModel):
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey("core_user.MyUser", on_delete=models.CASCADE)
    result = models.IntegerField()

    def __str__(self):
        return f"lesson - {self.lesson.id}, solved by {self.user}"

    @staticmethod
    def get_solved_lesson(lesson: Lesson, user: MyUser) -> SolvedLesson:
        try:
            return SolvedLesson.objects.filter(lesson=lesson).get(user=user)
        except (ObjectDoesNotExist, ValueError, TypeError):
            raise Http404

    @staticmethod
    def was_solved(lesson: Lesson, user: MyUser) -> bool:
        return SolvedLesson.objects.filter(lesson=lesson, user=user).exists()

    @staticmethod
    def user_result(lesson: Lesson, user: MyUser) -> int:
        if SolvedLesson.was_solved(lesson, user):
            return SolvedLesson.objects.filter(lesson=lesson).get(user=user).result
        return 0
