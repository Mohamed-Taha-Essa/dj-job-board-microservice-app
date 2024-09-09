from rest_framework import generics
from rest_framework import filters


from .models import Job , JobApply
from .serializers import JobApplySerializer  , JobSerializer
from .pagination import JobPagination

class JobsListCreateAPI(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    pagination_class =JobPagination


    
class JobsDetailUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer