import json
from rest_framework import serializers

from core.lesson.models import Lesson, Test, Task, SolvedLesson, Language
from core.abstract.serializers import AbstractSerializer


class TaskSerializer(serializers.ModelSerializer):
    answer = serializers.CharField(max_length=255, write_only=True, required=True)
    class Meta:
        model = Task
        fields = ["id", "question", "answer", "variant_a", "variant_b", "variant_c", "variant_d"]


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
    owner_id = serializers.ReadOnlyField(source="owner.id")
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
        fields = ["id", "title", "type", "language", "description", "poster", "solved", "result", "text", "owner", "owner_id", "liked", "likes_count", "test", "created", "updated"]

    def create(self, validated_data):
        language_data = validated_data.pop("language")
        language = Language.objects.get(pk=language_data)
        validated_data["language"] = language
        if "test" in validated_data:
            test_data = validated_data.pop("test")
            print(test_data)
            test_data = json.loads(test_data)
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
            try:
                test = Test.objects.get(test_lesson=instance)
                tasks = Task.objects.filter(task_test=test)
                if len(tasks) > len(test_data["task_set"]):
                    for i in range(len(test_data["task_set"]), len(tasks) + 1):
                        tasks[i].delete()

                for i in range(len(tasks)):
                    tasks[i].question = test_data["task_set"][i]["question"]
                    tasks[i].answer = test_data["task_set"][i]["answer"]
                    tasks[i].variant_a = test_data["task_set"][i]["variant_a"]
                    tasks[i].variant_b = test_data["task_set"][i]["variant_b"]
                    tasks[i].variant_c = test_data["task_set"][i]["variant_c"]
                    tasks[i].variant_d = test_data["task_set"][i]["variant_d"]
                    tasks[i].save()

                if len(test_data["task_set"]) > len(tasks):
                    for i in range(len(tasks), len(test_data["task_set"])):
                        new_task = Task()
                        new_task.task_test = test
                        new_task.question = test_data["task_set"][i]["question"]
                        new_task.answer = test_data["task_set"][i]["answer"]
                        new_task.variant_a = test_data["task_set"][i]["variant_a"]
                        new_task.variant_b = test_data["task_set"][i]["variant_b"]
                        new_task.variant_c = test_data["task_set"][i]["variant_c"]
                        new_task.variant_d = test_data["task_set"][i]["variant_d"]
                        new_task.save()
            except Test.DoesNotExist:
                test = Test.objects.create(test_lesson=instance)
                for task in test_data["task_set"]:
                    new_task = Task()
                    new_task.task_test = test
                    new_task.question = task["question"]
                    new_task.answer = task["answer"]
                    new_task.variant_a = task["variant_a"]
                    new_task.variant_b = task["variant_b"]
                    new_task.variant_c = task["variant_c"]
                    new_task.variant_d = task["variant_d"]
                    new_task.save()
                instance.test = test

        instance.title = validated_data.get("title", instance.title)
        instance.description = validated_data.get("description", instance.description)
        instance.type = validated_data.get("type", instance.type)
        instance.language = validated_data.get("language", instance.language)
        instance.text = validated_data.get("text", instance.text)
        instance.owner = validated_data.get("owner", instance.owner)
        instance.save()

        return instance


class LessonListSerializer(serializers.HyperlinkedModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")
    owner_id = serializers.ReadOnlyField(source="owner.id")
    lesson_url = serializers.HyperlinkedIdentityField(view_name="lesson-detail")
    language = serializers.StringRelatedField()

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["type"] = instance.get_lesson_type(type_id=rep["type"])

        return rep

    class Meta:
        model = Lesson
        fields = ["id", "title", "type", "language", "description", "poster", "owner", "owner_id", "lesson_url",  "created", "updated"]
