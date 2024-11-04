# from django_filters import rest_framework as filter 

# from .models import Job ,JOB_TYPE ,EDUCATION_TYPE ,EXPERIENCE_TYPE
# class JobFilter(filter.FilterSet):
#     keyword = filter.CharFilter(field_name='title' ,lookup_expr='contains')
#     min_salary = filter.NumberFilter(field_name='salary' ,lookup_expr='gte')
#     max_salary =filter.NumberFilter(field_name='salary' , lookup_expr='lte')
#     date = filter.DateFilter(field_name='created_at' ,lookup_expr='range')


#     class Meta:
#         model =Job
#         fields = ['keyword' ,'job_type' ,'education','experience' ,'min_salary',
#                   'max_salary','date' ]
        
from django_filters import rest_framework as filters
from .models import Job, JOB_TYPE, EDUCATION_TYPE, EXPERIENCE_TYPE

class JobFilter(filters.FilterSet):
    keyword = filters.CharFilter(field_name='title', lookup_expr='icontains')
    min_salary = filters.NumberFilter(field_name='salary', lookup_expr='gte')
    max_salary = filters.NumberFilter(field_name='salary', lookup_expr='lte')
    # date = filters.DateFromToRangeFilter(field_name='created_at')
    # date = filters.DateFilter(field_name='created_at' ,lookup_expr='range')
    date = filters.DateTimeFromToRangeFilter(field_name='created_at')

    

    # Multiple value filters
    # job_type = filters.MultipleChoiceFilter(choices=JOB_TYPE)
    # education = filters.MultipleChoiceFilter(choices=EDUCATION_TYPE)
    # experience = filters.MultipleChoiceFilter(choices=EXPERIENCE_TYPE)
    job_type = filters.CharFilter(method='filter_by_job_type')
    education = filters.CharFilter(method='filter_by_education')
    experience = filters.CharFilter(method='filter_by_experience')

    class Meta:
        model = Job
        fields = ['keyword', 'job_type', 'education', 'experience', 'min_salary', 'max_salary', 'date']

    def filter_by_job_type(self, queryset, name, value):
        job_types = value.split(',')
        return queryset.filter(job_type__in=job_types)

    def filter_by_education(self, queryset, name, value):
        education_levels = value.split(',')
        return queryset.filter(education__in=education_levels)

    def filter_by_experience(self, queryset, name, value):
        experience_levels = value.split(',')
        return queryset.filter(experience__in=experience_levels)