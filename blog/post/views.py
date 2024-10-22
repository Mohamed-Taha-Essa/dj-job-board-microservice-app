from rest_framework import generics , status
from rest_framework.response import Response

from .models import Post , PostLikes , Comment
from .serializers import PostLikesSerializer , PostSerializer , CommentSerializer
from .pagination import PostPagination

class PostListAPI(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = PostPagination
    
    
class PostDetailAPI(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    

class CommentCreateAPI(generics.CreateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    
    
    
class PostLikeCreateAPI(generics.CreateAPIView):
    serializer_class = PostLikesSerializer
    queryset = PostLikes.objects.all()
    
    def perform_create(self, serializer):
        post_id = self.request.data.get('post')
        user_id = self.request.data.get('user_id')
        
        try:
            post = Post.objects.get(id=post_id)
            like_instance = PostLikes.objects.filter(post=post,user_id=user_id).first()
            if like_instance:
                like_instance.delete()
                return Response({'message':'post unliked'},status=status.HTTP_200_OK)
            else:
                serializer.save(post=post,user_id=user_id)
                return Response({'message':'post liked'} ,status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({'error':e})