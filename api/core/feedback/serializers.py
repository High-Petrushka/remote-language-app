from rest_framework import serializers
from rest_framework.fields import ReadOnlyField

from core.feedback.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    user_id = ReadOnlyField(source="user.id")
    user_first_name = ReadOnlyField(source="user.first_name")
    class Meta:
        model = Feedback
        fields = ["body", "grade", "user_id", "user_first_name", "selected"]
