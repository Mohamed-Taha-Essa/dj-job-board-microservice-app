from rest_framework import generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

from .filters import JobFilter
from .models import Job , JobApply
from .serializers import JobApplySerializer  , JobSerializer
from .pagination import JobPagination

class JobsListCreateAPI(generics.ListCreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    pagination_class =JobPagination

    filter_backends = [DjangoFilterBackend ,filters.SearchFilter,filters.OrderingFilter]
    ordering_fields = ['salary', 'created_at']

    filterset_class = JobFilter
    
class JobsDetailUpdateDeleteAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


class JobApply(generics.CreateAPIView):
    queryset =JobApply.objects.all()
    serializer_class = JobApplySerializer