from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

   
class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']
        extra_kwargs = {
            'email': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user 
    
# class CustomUserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User 
#         # fields = '__all__'
#         fields = ['id','username','email','image']
from django.conf import settings
from rest_framework import serializers

class CustomUserSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['image', 'image_url', 'username', 'email' ,'date_joined']

    def get_image_url(self, obj):
        # Get the request context and build the full URL
        request = self.context.get('request')
        if request:
            print('hellow')
            return request.build_absolute_uri(settings.MEDIA_URL + str(obj.image.name))
        return settings.MEDIA_URL + str(obj.image.name)