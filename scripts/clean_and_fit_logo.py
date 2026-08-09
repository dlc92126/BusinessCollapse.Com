from PIL import Image, ImageFilter, ImageOps

img_path = r'C:\Users\dlc92\.gemini\antigravity\brain\3f5cb67a-f140-4cf4-b124-9c79afb2e669\logo_concept_c_1785964716080.jpg'
img = Image.open(img_path)

# Precise crop box around the dark slate logo placard
# (left, upper, right, lower)
crop_box = (185, 208, 1195, 612)
cropped = img.crop(crop_box)

# Smooth and sharpen to eliminate jagged pixelation edges
# High quality Lanczos resize
target_width = 800
target_height = int(cropped.height * (800 / cropped.width))
resized = cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)

# Slight unsharp mask to crisp text & lines
cleaned = resized.filter(ImageFilter.UnsharpMask(radius=1.5, percent=120, threshold=3))

output_path = r'c:\Users\dlc92\Projects\BusinessCollapse.Com\public\logo_wide_official.png'
cleaned.save(output_path, quality=100)
print(f"Successfully cleaned and resampled wide logo banner to {target_width}x{target_height} at:", output_path)
