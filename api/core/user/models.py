from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

from core.abstract.models import AbstractModel


class MyUserManager(BaseUserManager):
    def create_user(self, username, password=None, **kwargs):
        if not username:
            raise ValueError("Users must have a username!")
        if not password:
            raise ValueError("Users must have a password!")

        user = self.model(
            username=username,
            **kwargs,
        )
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password=None, **kwargs):
        user = self.create_user(
            username=username,
            password=password,
            **kwargs,
        )
        user.is_admin = True
        user.save(using=self._db)

        return user


def get_avatar_upload_path(instance: MyUser, filename: str) -> str:
    return f"{instance.username}/avatars/{filename}"


class MyUser(AbstractBaseUser, AbstractModel, PermissionsMixin):
    LANGUAGE_CHOICES = {
        1: "en",
        2: "gr",
        3: "fr",
        4: "ru",
    }

    username = models.CharField(
        max_length=255,
        unique=True,
    )
    first_name = models.CharField(
        max_length=255,
    )
    last_name = models.CharField(
        max_length=255,
        null=True,
        blank=True,
    )
    email = models.EmailField(
        verbose_name="email address",
    )
    bio = models.TextField(
        null=True,
        blank=True,
    )
    avatar = models.ImageField(
        upload_to=get_avatar_upload_path,
        null=True,
        blank=True,
    )
    is_active = models.BooleanField(
        default=True,
    )
    is_admin = models.BooleanField(
        default=False,
    )
    lessons_liked = models.ManyToManyField(
        "core_lesson.Lesson",
        related_name="liked_by",
        null=True,
        blank=True
    )

    objects = MyUserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"

    def __str__(self):
        return f"{self.username}"

    def get_avatar_upload_path(self):
        return f"{self.username}/avatars/"

    def like_lesson(self, lesson):
        return self.lessons_liked.add(lesson)

    def remove_like(self, lesson):
        return self.lessons_liked.remove(lesson)

    def has_liked(self, lesson):
        return self.lessons_liked.filter(pk=lesson.pk).exists()

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin