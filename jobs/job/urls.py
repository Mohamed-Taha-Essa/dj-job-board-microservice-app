from .views import JobsListCreateAPI ,JobsDetailUpdateDeleteAPI,JobApply

from django.urls import path
urlpatterns = [
    path("", JobsListCreateAPI.as_view(), name="job_list"),
    path("<int:pk>", JobsDetailUpdateDeleteAPI.as_view(), name="job_detail"),
    
    path("/job-apply", JobApply.as_view(), name="JobApply"),


]