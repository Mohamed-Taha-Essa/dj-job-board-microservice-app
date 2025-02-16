from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model 
from django.core.cache import cache 

import redis 
import json  

redis_client = redis.StrictRedis(host='localhost' ,port=6379 ,decode_responses=True)
User = get_user_model()
@receiver(post_save ,sender=User)
def update_user_in_redis(sender , instance ,created ,**kwargs):
    try:
        user = instance
        user_data= {
            'id':user.id,
            'email':user.email,
            'username':user.username,
            'is_active':user.is_active,
            'isstaff' :user.is_staff,
            'date_join':user.date_joined.isostring(),
            'image':user.image.url if user.image else None 
        }

        cach_key = f"user:{user.id}"
        redis_client.set(cach_key ,json.dumps(user_data))

        #publish the msg
        message = json.dumps({'user_id' :user.id , 'data':user_data})
        redis_client.publish('user_updates',message)
        cache.delete(cach_key)
    except Exception as e : 
        print(e)