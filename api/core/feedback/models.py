from django.db import models
from core.user.models import MyUser


class Feedback(models.Model):
    GRADE_CHOICES = {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
    }

    body = models.TextField()
    grade = models.IntegerField(choices=GRADE_CHOICES)
    selected = models.BooleanField(default=False)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"Feedback of {self.user.username}"
