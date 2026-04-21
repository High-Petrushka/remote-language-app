from django.urls import path

from core.administration.views import LanguageList, LanguageDetail, AdministrationRootView, block_user, admin_users_list


urlpatterns = [
    path('administration/', AdministrationRootView.as_view(), name="administration-list"),
    path('administration/languages/', LanguageList.as_view(), name='language-list'),
    path('administration/languages/<int:pk>/', LanguageDetail.as_view(), name='language-detail'),
    path('administration/users/', admin_users_list, name='administration-user-list'),
    path('administration/users/<int:pk>/block/', block_user, name='user-block'),
]
