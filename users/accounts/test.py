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
        email = EmailMessage(
            mail_subject, 
            message, 
            'pythondeveloper6@gmail.com', 
            [to_email]
        )
        email.content_subtype = "html"  # Set the content type to HTML
        email.send()
       
        return Response({
            'success': 'User was registered successfully. Please check your email to activate your account.'
        }, status=status.HTTP_201_CREATED)

    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)