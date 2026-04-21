from django.contrib import admin

from core.user.models import MyUser
from core.comment.models import Comment
from core.lesson.models import Lesson, Test, Task, Language, SolvedLesson


admin.site.register(MyUser)
admin.site.register(Comment)
admin.site.register(Lesson)
admin.site.register(Test)
admin.site.register(Task)
admin.site.register(Language)
admin.site.register(SolvedLesson)
