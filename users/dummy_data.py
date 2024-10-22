import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

import random
from faker import Faker
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from accounts.models import CustomUser  # Make sure to replace 'myapp' with your actual app name

def generate_dummy_users(num=10):
    fake = Faker()
    
    for _ in range(num):
        email = fake.unique.email()
        username = fake.unique.user_name()
        
        # Create a dummy image for the user's profile
        image_file = generate_dummy_image()
        user = CustomUser.objects.create_user(
            email=email,
            username=username,
            password=fake.password(length=10),
            is_active=True,
            is_staff=random.choice([True, False]),
            image=image_file
        )
        print(f"Created user: {user.email}")

def generate_dummy_image():
    """Generate a simple dummy image file"""
    # Create a white square image using Pillow
    image = Image.new('RGB', (100, 100), color=(255, 0, 255))
    output = BytesIO()
    image.save(output, format='JPEG')
    output.seek(0)
    return SimpleUploadedFile('user_image.jpg', output.read(), content_type='image/jpeg')

# Generate 30 dummy users
generate_dummy_users(100)