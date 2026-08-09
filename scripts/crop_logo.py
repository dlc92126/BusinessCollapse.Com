from PIL import Image

img_path = r'C:\Users\dlc92\.gemini\antigravity\brain\3f5cb67a-f140-4cf4-b124-9c79afb2e669\logo_concept_c_1785964716080.jpg'
img = Image.open(img_path)

# Image size is (1376, 768)
# Crop precisely around the logo mark inside the dark wall placard
# Bounding box: (left, upper, right, lower)
crop_box = (230, 220, 1140, 620)
cropped = img.crop(crop_box)

# Save to public directory
output_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\public\logo_concept_c_official.png'
cropped.save(output_path, quality=100)
print("Successfully cropped logo to:", output_path)
