from rest_framework import serializers

from core.user.models import MyUser


class ApiRootSerializer(serializers.ModelSerializer):
    user_url = serializers.HyperlinkedIdentityField(
        view_name="user-detail"
    )

    class Meta:
        model = MyUser
        fields = ["user_url"]
