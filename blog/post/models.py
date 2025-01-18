from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from shared_utils.user_data_mixin import UserDataMixin

class Post(models.Model ,UserDataMixin):
    title = models.CharField(max_length=120)
    content = models.TextField(max_length=20000)
    publish_date = models.DateTimeField(default=timezone.now)
    slug = models.SlugField(null=True,blank=True)
    author_id = models.IntegerField()
    
    
    def save(self, *args, **kwargs):
       self.slug = slugify(self.title)
       super(Post, self).save(*args, **kwargs) # Call the real save() method
    
    def __str__(self):
        return self.title
    def get_user_data(self):
        return super().get_user_data(self.author_id)
    

class PostLikes(models.Model ,UserDataMixin):
    post = models.ForeignKey(Post , related_name='post_likes',on_delete=models.CASCADE)
    user_id = models.IntegerField()
    
    def __str__(self):
        return str(self.post)
    
    def get_user_data(self):
        return super().get_user_data(self.user_id)
    
    
    
class Comment(models.Model,UserDataMixin):
    user_id = models.IntegerField()
    post = models.ForeignKey(Post , related_name='comment_post', on_delete=models.CASCADE)
    content = models.TextField(max_length=500)
    comment_date = models.DateTimeField(default=timezone.now)
    
    
    def __str__(self):
        return str(self.post)
    
    def get_user_data(self):
        return super().get_user_data(self.user_id)