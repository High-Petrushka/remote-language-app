from rest_framework import serializers

from core.user.models import MyUser


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
    )

    class Meta:
        model = MyUser
        fields = ["id", "username", "email", "first_name", "password"]