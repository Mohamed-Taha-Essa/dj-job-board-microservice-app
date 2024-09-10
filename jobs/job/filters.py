from django_filters import rest_framework as filter 

from .models import Job ,JOB_TYPE ,EDUCATION_TYPE ,EXPERIENCE_TYPE
class JobFilter(filter.FilterSet):
    keyword = filter.CharFilter(field_name='title' ,lookup_expr='contains')
    min_salary = filter.NumberFilter(field_name='salary' ,lookup_expr='gte')
    max_salary =filter.NumberFilter(field_name='salary' , lookup_expr='lte')
    date = filter.DateFilter(field_name='created_at' ,lookup_expr='range')


    class Meta:
        model =Job
        fields = ['keyword' ,'job_type' ,'education','experience' ,'min_salary',
                  'max_salary','date' ]