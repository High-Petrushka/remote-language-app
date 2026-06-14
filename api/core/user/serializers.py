from rest_framework import serializers

from core.abstract.serializers import AbstractSerializer
from core.user.models import MyUser
from core.lesson.serializers import LessonListSerializer


class MyUserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
    )
    user_url = serializers.HyperlinkedIdentityField(view_name="user-detail")
    first_name = serializers.CharField(write_only=True, required=True)
    last_name = serializers.CharField(write_only=True, required=False)
    bio = serializers.CharField(write_only=True, required=False)

    def to_representation(self, instance):
        rep = super().to_representation(instance)

        return rep

    class Meta:
        model = MyUser
        fields = ["id", "username", "email", "first_name", "last_name", "avatar", "bio", "is_active", "is_admin", "password", "user_url"]
        read_only_fields = ["is_active", "is_admin"]

    def create(self, validated_data):
        user = MyUser(
            username=validated_data.pop("username"),
            email=validated_data.pop("email"),
            **validated_data,
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

class MyUserDetailSerializer(AbstractSerializer):
    lesson_set = LessonListSerializer(many=True, read_only=True)

    class Meta:
        model = MyUser
        fields = ["id", "username", "email", "first_name", "last_name", "avatar", "bio", "language", "is_active", "is_admin", "lesson_set", "created", "updated"]
