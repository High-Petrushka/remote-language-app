from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.authtoken import views

from core.views import api_root


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", api_root, name='api-root'),
    path("", include('core.user.urls')),
    path("", include('core.auth.urls')),
    path("", include('core.lesson.urls')),
    path("", include('core.administration.urls')),
    path("", include('core.comment.urls')),
    path(r'api-token-auth/', views.obtain_auth_token, name="auth-token"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
