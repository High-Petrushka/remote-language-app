from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from rest_framework.relations import HyperlinkedRelatedField, HyperlinkedIdentityField

from core.feedback.models import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    user_name = ReadOnlyField(source="user.username")
    user_id = ReadOnlyField(source="user.id")
    user_avatar = HyperlinkedIdentityField(view_name="user-detail")
    class Meta:
        model = Feedback
        fields = ["id", "body", "grade", "user_name", "user_id", "user_avatar", "selected"]
