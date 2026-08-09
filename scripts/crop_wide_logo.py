from PIL import Image

img_path = r'C:\Users\dlc92\.gemini\antigravity\brain\3f5cb67a-f140-4cf4-b124-9c79afb2e669\logo_concept_c_1785964716080.jpg'
img = Image.open(img_path)

# Crop the full wide logo banner matching the user's uploaded aspect ratio
crop_box = (150, 200, 1220, 630)
cropped = img.crop(crop_box)

output_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\public\logo_wide_official.png'
cropped.save(output_path, quality=100)
print("Successfully saved wide logo banner to:", output_path)
