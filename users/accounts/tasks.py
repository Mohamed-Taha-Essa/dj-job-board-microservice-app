from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth import get_user_model

User = get_user_model() 
@shared_task
def send_activation_email_task(user_id, domain, secure):
    """
    Celery task to send the activation email to a user.
    :param user_id: ID of the user to whom the email should be sent
    :param domain: Current site domain
    :param secure: Boolean indicating if the request is secure (https)
    """
    try:
        print("=================================================")
        user = User.objects.get(pk=user_id)  # Fetch the user by ID
        mail_subject = 'Activate Your Account'
        html_message = render_to_string('accounts/activate_email.html', {
            'user': user,
            'domain': domain,
            'protocol': 'https' if secure else 'http',
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': default_token_generator.make_token(user),
        })
        plain_message = strip_tags(html_message)
        to_email = user.email

        # Create and send the email
        email = EmailMultiAlternatives(
            subject=mail_subject,
            body=plain_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[to_email]
        )
        email.attach_alternative(html_message, "text/html")  # Attach HTML content
        email.send()

        print(email)
    except User.DoesNotExist:
        print("llllllllllllllllllllllllllll")
        # Handle the case where the user does not exist
        pass
