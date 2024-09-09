from .views import JobsListCreateAPI ,JobsDetailUpdateDeleteAPI

from django.urls import path
urlpatterns = [
    path("", JobsListCreateAPI.as_view(), name="job_list"),
    path("<int:pk>", JobsDetailUpdateDeleteAPI.as_view(), name="job_detail")

]