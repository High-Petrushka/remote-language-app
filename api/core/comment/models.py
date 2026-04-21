from django.db import models

from core.abstract.models import AbstractModel


class Comment(AbstractModel):
    lesson = models.ForeignKey("core_lesson.Lesson", on_delete=models.CASCADE)
    author = models.ForeignKey("core_user.MyUser", on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)

    def __str__(self):
        return f"by {self.author.username} for lesson {self.lesson.id}"
