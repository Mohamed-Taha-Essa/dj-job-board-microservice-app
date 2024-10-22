from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

    
    
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        # fields = '__all__'
        fields = ['id','username','email','image']