from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.permissions import IsAuthenticated , AllowAny
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_decode , urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from rest_framework import generics
from .models import CustomUser
from .serializers import UserSignupSerializer
from rest_framework.authtoken.models import Token
from .serializers import UserSignupSerializer , CustomUserSerializer

user = get_user_model()  # get CustomUser

class UserLoginAPI(ObtainAuthToken):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']  # user=email comming from input
        token , created = Token.objects.get_or_create(user=user)
        user_data = {
            'user_id' : user.id  ,
            'email' : user.email ,
            'username' : user.username
        }
        return Response({'token':token.key,'user':user_data},status=status.HTTP_200_OK)

class UserLogoutAPI(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class ChangePasswordAPI(APIView):
    permission_classes = [AllowAny]
    
    def put(self,request):
        user = request.user
        data = request.data
        
        if not user.check_password(data.get('old_password')):
            return Response({'message':'old password was wrong'},status=status.HTTP_400_BAD_REQUEST)
        
        # update password
        user.set_password(data.get('new_password'))
        user.save()
        
        # send email
        return Response({'message':'password was changes successfully'},status=status.HTTP_200_OK)

class ResendActivationCodeAPI(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = user.objects.get(email=email)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_active:
            return Response({'error' : 'user account is already activated'} , status=status.HTTP_400_BAD_REQUEST)
        
        # activation link 
        current_site = get_current_site(request) # get domain 
        mail_subject = 'Activate Your Account'
        
        # render email content in html template 
        message = render_to_string('accounts/activate_email.html',{
            'user': user , 
            'domain' : current_site.domain , 
            'uid' : urlsafe_base64_decode(force_bytes(user.id)),
            'token': default_token_generator.make_token(user) 
        })
        to_email = user.email
        send_mail(mail_subject,message,'pythondeveloper6@gmail.com',[to_email])
        return Response({'success':'User was registered successfully , please check your email '},status=status.HTTP_200_OK)
    

class ResetPasswordAPI(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        try:
            user = user.objects.get(email=email)
        except Exception as e:
            return Response({'error': e}, status=status.HTTP_400_BAD_REQUEST)

        # activation link 
        current_site = get_current_site(request) # get domain 
        mail_subject = 'Reset Your Password'
        
        # render email content in html template 
        message = render_to_string('accounts/password_reset_email.html',{
            'user': user , 
            'domain' : current_site.domain , 
            'uid' : urlsafe_base64_decode(force_bytes(user.id)),
            'token': default_token_generator.make_token(user) 
        })
        to_email = user.email
        send_mail(mail_subject,message,'pythondeveloper6@gmail.com',[to_email])
        return Response({'success':'User was registered successfully , please check your email '},status=status.HTTP_200_OK)

class UserSignupAPI(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = UserSignupSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            user.is_active = False
            user.save()
            
            current_site = get_current_site(request)
            mail_subject = 'Activate Your Account'
            
            message = render_to_string('accounts/activate_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            to_email = user.email
            send_mail(mail_subject, message, 'pythondeveloper6@gmail.com', [to_email])
            
            return Response({
                'success': 'User was registered successfully. Please check your email to activate your account.'
            }, status=status.HTTP_201_CREATED)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class UserProfileAPI(APIView):
    permission_classes = [AllowAny]
    
    def get(self,request,*args,**kwargs):
        user = request.user 
        serializer = CustomUserSerializer(user)
    
        return Response(serializer.data , status=status.HTTP_200_OK)
    
    
    
class UserDetailAPI(generics.RetrieveAPIView):
    queryset = user.objects.all()
    serializer_class = CustomUserSerializer
