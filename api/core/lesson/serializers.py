from rest_framework import serializers

from core.lesson.models import Lesson, Test, Task, SolvedLesson, Language
from core.abstract.serializers import AbstractSerializer


class TaskSerializer(serializers.ModelSerializer):
    answer = serializers.CharField(max_length=255, write_only=True, required=True)
    class Meta:
        model = Task
        fields = ["id", "question", "answer", "variant_a", "variant_b", "variant_c", "variant_d"]

    #def update(self, instance, validated_data):
    #    task_mapping = {task.id: task for task in instance}
    #    data_mapping = {item["id"]: item for item in validated_data}

    #    ret = []
    #    for task_id, data in data_mapping.items():
    #        task = task_mapping.get(task_id, None)
    #        if task is None:
    #            ret.append(self.create(data))
    #        else:
    #            ret.append(self.update(task, data))

    #    for task_id, task in task_mapping.items():
    #        if task_id not in data_mapping:
    #            task.delete()

    #    return ret


class TestSerializer(serializers.ModelSerializer):
    task_set = TaskSerializer(many=True, min_length=2, max_length=10)
    test_answer = serializers.ListSerializer(
        child=serializers.CharField(),
        min_length=2,
        max_length=10,
        allow_empty=True,
        required=False
    )

    class Meta:
        model = Test
        fields = ["id", "task_set", "test_answer"]


class TestCheckSerializer(serializers.ModelSerializer):
    test_answer = serializers.ListSerializer(
        child=serializers.CharField(),
        min_length=2,
        max_length=10
    )

    class Meta:
        model = Test
        fields = ["test_answer"]


class LessonSerializer(AbstractSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    test = TestSerializer(required=False)
    language = serializers.StringRelatedField()
    liked = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    solved = serializers.SerializerMethodField()
    result = serializers.SerializerMethodField()

    def get_liked(self, instance):
        request = self.context.get("request", None)

        if request is None or request.user.is_anonymous:
            return False

        return request.user.has_liked(instance)

    def get_likes_count(self, instance):
        return instance.liked_by.count()

    def get_solved(self, instance):
        request = self.context.get("request", None)

        if request is None or request.user.is_anonymous:
            return False

        return SolvedLesson.was_solved(lesson=instance, user=request.user)

    def get_result(self, instance):
        request = self.context.get("request", None)

        if request is None or request.user.is_anonymous:
            return 0

        return SolvedLesson.user_result(lesson=instance, user=request.user)

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["type"] = instance.get_lesson_type(type_id=rep["type"])

        return rep

    class Meta:
        model = Lesson
        fields = ["id", "title", "type", "language", "description", "poster", "solved", "result", "text", "owner", "liked", "likes_count", "test", "created", "updated"]

    def create(self, validated_data):
        language_data = validated_data.pop("language")
        language = Language.objects.get(pk=language_data)
        validated_data["language"] = language
        if "test" in validated_data:
            test_data = validated_data.pop("test")
            tasks_data = test_data.pop("task_set")
            lesson = Lesson.objects.create(**validated_data)
            test = Test.objects.create(test_lesson=lesson, **test_data)
            tasks = [Task(task_test=test, **item) for item in tasks_data]
            Task.objects.bulk_create(tasks)
        else:
            lesson = Lesson.objects.create(**validated_data)

        return lesson

    def update(self, instance, validated_data):

        if "test" in validated_data:
            test_data = validated_data.pop("test")
            instance.test = test_data.get("test", instance.test)

        instance.title = validated_data.get("title", instance.title)
        instance.type = validated_data.get("type", instance.type)
        instance.language = validated_data.get("language", instance.language)
        instance.text = validated_data.get("text", instance.text)
        instance.owner = validated_data.get("owner", instance.owner)
        instance.save()

        return instance


class LessonListSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    lesson_url = serializers.HyperlinkedIdentityField(view_name="lesson-detail")
    language = serializers.StringRelatedField()

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["type"] = instance.get_lesson_type(type_id=rep["type"])

        return rep

    class Meta:
        model = Lesson
        fields = ["id", "title", "type", "language", "description", "poster", "owner", "lesson_url",  "created", "updated"]
