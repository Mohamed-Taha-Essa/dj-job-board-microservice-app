import redis 
import requests 
import json

#create redis client 
# redis_client = redis.StrictRedis(host='redis' , port=6379 , db=0)
# Create Redis client (LOCAL Redis)
redis_client = redis.StrictRedis(
    host='localhost',  # Use 'localhost' instead of 'redis' (Docker service name)
    port=6379, 
    db=0,
    decode_responses=True  # Ensure responses are decoded properly
)
#users service url 

# USERS_SERVICE_URL = 'http://users:8001'
USERS_SERVICE_URL = 'http://localhost:8001' 

class UserDataMixin:
    @staticmethod
    def get_user_data(user_id):
        cache_key = f'user:{user_id}'   # user:1
        cached_data = redis_client.get(cache_key)

        if cached_data:
            return  json.loads(cached_data)
        
        #if user not in cache get it from users dataa direct 

        response = requests.get(f"{USERS_SERVICE_URL}/accounts/{user_id}") #endpoint to return user data
        if response.status_code ==200 :
            user_data = response.json()
            redis_client.set(cache_key ,json.dumps(user_data))
            return user_data 
        
        return None