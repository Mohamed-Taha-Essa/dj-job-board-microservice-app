from django.contrib import admin

from .models import Post , PostLikes , Comment



admin.site.register(Post)
admin.site.register(PostLikes)
admin.site.register(Comment)