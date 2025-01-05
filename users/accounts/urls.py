from django.urls import path 
from . import views


urlpatterns = [
    path('login/' , views.UserLoginAPI.as_view()),
    path('signup/' , views.UserSignupAPI.as_view()),
    path('logout/' , views.UserLogoutAPI.as_view()),
    path('profile/' , views.UserProfileAPI.as_view()),
    path('profile/edit-profile/' , views.UserUpdateProfileAPI.as_view()),

    path('change-password/' , views.ChangePasswordAPI.as_view()),
    path('resend-activation/' , views.ResendActivationCodeAPI.as_view()),
    path('reset-password/' , views.ResetPasswordAPI.as_view()),
    path('<int:pk>', views.UserDetailAPI.as_view()),
]