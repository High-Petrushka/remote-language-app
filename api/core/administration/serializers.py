from rest_framework import serializers

from core.lesson.models import Language
from core.user.models import MyUser


class AdministrationRootSerializer(serializers.Serializer):
    languages = serializers.HyperlinkedIdentityField(
        view_name="language-list"
    )


class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "name"]


class BlockUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    is_active = serializers.BooleanField()

    def update(self, instance, validated_data):
        instance.is_active = validated_data.get("is_active", instance.is_active)
        instance.save()

        return instance