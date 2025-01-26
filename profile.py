import os
import requests

# Set your Pexels API Key (Get it from https://www.pexels.com/api/)
PEXELS_API_KEY = "bv7Z1T3CquIhywXL9rBcKME8OdlsC05CIJmlRZUdps7BjzWSvHcEJFMX"

# Number of images to download
NUM_IMAGES = 2
SEARCH_QUERY = "profile face boy"

# Create a folder to store images
SAVE_FOLDER = "profile_images"
os.makedirs(SAVE_FOLDER, exist_ok=True)

# Fetch images from Pexels API
url = f"https://api.pexels.com/v1/search?query={SEARCH_QUERY}&per_page={NUM_IMAGES}"
headers = {"Authorization": PEXELS_API_KEY}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    images = response.json()["photos"]
    
    for index, img in enumerate(images):
        img_url = img["src"]["large"]
        img_data = requests.get(img_url).content
        img_name = os.path.join(SAVE_FOLDER, f"profile_{index+1}.jpg")

        with open(img_name, "wb") as file:
            file.write(img_data)
        
        print(f"Downloaded: {img_name}")

    print("✅ All images downloaded successfully!")

else:
    print("❌ Failed to fetch images. Check your API key or request limit.")

