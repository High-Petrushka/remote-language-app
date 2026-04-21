from rest_framework import serializers

from core.comment.models import Comment
from core.user.models import MyUser
from core.user.serializers import MyUserSerializer


class CommentSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        author = MyUser.objects.get(pk=rep["author"])
        rep["author"] = MyUserSerializer(author, context={"request": self.context["request"]}).data

        return rep

    class Meta:
        model = Comment
        fields = ["id", "lesson", "author", "body", "edited"]
        read_only_fields = ["lesson", "author", "edited"]

    def update(self, instance, validated_data):
        if not instance.edited:
            validated_data["edited"] = True
        instance.lesson = validated_data.get("lesson", instance.lesson)
        instance.author = validated_data.get("author", instance.author)
        instance.body = validated_data.get("body", instance.body)
        instance.edited = validated_data.get("edited", instance.edited)
        instance.save()

        return instance
