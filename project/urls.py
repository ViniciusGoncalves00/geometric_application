from django.urls import path
from . import views

urlpatterns = [
    path('', views.Main.as_view(), name="index"),
    path('cubes/', views.CubeListView.as_view(), name="cubes"),
]