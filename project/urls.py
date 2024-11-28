from django.urls import path
from . import views

urlpatterns = [
    path('', views.main.as_view(), name="index"),
    # path('app/models/ThreeCube/', views.get_objects_from_db, name="get_objects_from_db"),
]