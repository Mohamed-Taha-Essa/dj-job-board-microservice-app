from rest_framework import serializers
from .models import Post , PostLikes , Comment


class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = '__all__'
        
    # def get_user(self,obj):
    #     return obj.get_user_data()
        
        
class PostSerializer(serializers.ModelSerializer):
    comment_post = CommentSerializer(many=True,read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    # user = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id','author_id','title','content','publish_date','slug','likes_count','comments_count','comment_post']
        # fields = '__all__'
        
        
    def get_likes_count(self,obj):
        return PostLikes.objects.filter(post=obj).count()
    
    def get_comments_count(self,obj):
        return Comment.objects.filter(post=obj).count()
    
    
    
class PostLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLikes
        fields = '__all__'