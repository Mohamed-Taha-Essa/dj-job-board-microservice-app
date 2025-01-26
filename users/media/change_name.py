import os


current_file_dir = os.path.dirname(os.path.realpath(__file__))
print(current_file_dir)
# Define directories for the two sets of images
set_1_dir = f"{current_file_dir}/users"
set_2_dir = f"{current_file_dir}/profile_images"
# Get sorted lists of image filenames from both directories
set_1_images = sorted(os.listdir(set_1_dir))
set_2_images = sorted(os.listdir(set_2_dir))
print(len(set_1_images))
print(len(set_2_images))

# Check if both folders have exactly 200 images
if len(set_1_images) != 202 or len(set_2_images) != 202:
    print("Error: Each folder must contain exactly 200 images.")
    exit()

# Rename images in set_2 using names from set_1
for img1, img2 in zip(set_1_images, set_2_images):
    # Extract name from first set (without extension)
    new_name = os.path.splitext(img1)[0]

    # Extract extension from second set (to keep original format)
    _, ext = os.path.splitext(img2)

    # Define new filename with the original extension
    new_filename = f"{new_name}{ext}"

    # Define full paths
    old_path = os.path.join(set_2_dir, img2)
    new_path = os.path.join(set_2_dir, new_filename)

    # Rename the file
    os.rename(old_path, new_path)
    print(f"Renamed: {img2} → {new_filename}")

print("✅ All images have been successfully renamed!")
