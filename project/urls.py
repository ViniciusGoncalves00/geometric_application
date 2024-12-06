from django.urls import path
from .views import views

urlpatterns = [
    path('', views.Main.as_view(), name="index"),
    # path('object_data/', views.CubeListView.as_view(), name="object_data"),
]