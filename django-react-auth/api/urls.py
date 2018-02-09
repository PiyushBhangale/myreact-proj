
from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token

from api import views
from .views import UserViewSet
router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = router.urls




urlpatterns += [
    url(r'^obtain-auth/$', views.check_auth),
    url(r'^create_user/$', views.create_user, name='account-create'),
    url(r'^notes/$', views.note_list),
    url(r'^post_notes/$', views.PostList),
    url(r'^update_notes/$', views.Markcompleted),
    url(r'^completed/$', views.completed_note_list),
    url(r'^all_users/$', views.all_users),
    url(r'^shared_data/$', views.create_share),
    url(r'^all_notes/$', views.all_note_list),


    url(r'^user_details/$', views.user_details),
]
