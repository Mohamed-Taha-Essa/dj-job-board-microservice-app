import os , django 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

import random
from faker import Faker
from post.models import  Post , PostLikes , Comment

from django.utils.timezone import make_aware
from datetime import datetime, timedelta
start_date = datetime.now() - timedelta(days=30)  # 30 days ago
end_date = datetime.now()

def generate_fake_posts(num=10):
    fake = Faker()
    for _ in range(num):
        title = fake.job()[:110] # Truncate title to 120 characters
        Post.objects.create(
            title = title,
            content = fake.paragraph(nb_sentences=10),
        publish_date=make_aware(fake.date_time_between(start_date=start_date, end_date=end_date)),
            author_id = random.randint(1,20)
        )
        

def generate_fake_post_likes(num=10):
    posts = Post.objects.all()
    for _ in range(num):
        PostLikes.objects.create(
            user_id = random.randint(1,100),
            post = random.choice(posts)
        )
            

def generate_fake_comments(num=10):
    posts = Post.objects.all()
    fake = Faker()
    for _ in range(num):
        Comment.objects.create(
            user_id = random.randint(1,100),
            post = random.choice(posts),
            content = fake.text(),
            comment_date =make_aware(fake.date_time_between(start_date=start_date, end_date=end_date))

        )


generate_fake_posts(100)
generate_fake_post_likes(200)
generate_fake_comments(200)