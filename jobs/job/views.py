from rest_framework import generics
from rest_framework import filters

from .models import Job , JobApply
from .serializers import JobApplySerializer  , JobSerializer


class JobsListCreateAPI(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


    
class JobsDetailUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer