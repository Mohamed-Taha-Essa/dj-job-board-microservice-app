from rest_framework import serializers
from .models import Job, JobApply

class JobSerializer(serializers.ModelSerializer):
    user =serializers.SerializerMethodField()
    class Meta:
        model = Job
        fields = '__all__'  # Or specify fields like ['id', 'title', 'description', 'job_type', ...]

    def get_user(self,obj):
        return obj.get_user_data()
class JobApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApply
        fields = ['user' ,'cover_letter' ,'job']
