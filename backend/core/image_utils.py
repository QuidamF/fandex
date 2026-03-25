import os
import base64
import uuid
import re
from io import BytesIO
from PIL import Image

# 📁 Configuración
OUTPUT_DIR = "static/images"
THUMB_DIR = os.path.join(OUTPUT_DIR, "thumbs")

MAX_HEIGHT = 800
THUMB_HEIGHT = 300

QUALITY_MAIN = 75
QUALITY_THUMB = 60

FORMAT = "WEBP"

def ensure_dirs():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(THUMB_DIR, exist_ok=True)

# 🔤 Normalizar nombre (slug)
def slugify(text):
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"\s+", "-", text)
    return text

def process_item_image(base64_string: str, item_name: str):
    try:
        ensure_dirs()
        
        # =========================
        # 🆔 UUID único
        # =========================
        image_uuid = str(uuid.uuid4())

        # =========================
        # 🧾 Nombre legible
        # =========================
        slug_name = slugify(item_name)
        ext = "webp"

        main_filename = f"{slug_name}_{image_uuid}.{ext}"
        thumb_filename = f"{slug_name}_{image_uuid}_thumb.{ext}"

        main_path = os.path.join(OUTPUT_DIR, main_filename)
        thumb_path = os.path.join(THUMB_DIR, thumb_filename)

        # =========================
        # 📥 Base64 → Imagen
        # =========================
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]

        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))

        # Preserve transparency if possible or convert to RGB for standard format
        if image.mode in ("RGBA", "P"):
            image = image.convert("RGB")

        # =========================
        # 🖼️ FULL IMAGE
        # =========================
        width, height = image.size

        if height > MAX_HEIGHT:
            new_height = MAX_HEIGHT
            new_width = int((new_height / height) * width)
            image_main = image.resize((new_width, new_height), Image.LANCZOS)
        else:
            image_main = image

        image_main.save(
            main_path,
            FORMAT,
            quality=QUALITY_MAIN,
            optimize=True
        )

        # =========================
        # 🖼️ THUMBNAIL
        # =========================
        width, height = image.size

        if height > THUMB_HEIGHT:
            new_height = THUMB_HEIGHT
            new_width = int((new_height / height) * width)
            image_thumb = image.resize((new_width, new_height), Image.LANCZOS)
        else:
            image_thumb = image.copy()

        image_thumb.save(
            thumb_path,
            FORMAT,
            quality=QUALITY_THUMB,
            optimize=True
        )

        # =========================
        # 📦 DATA PARA DB
        # =========================
        return {
            "success": True,
            "uuid": image_uuid,
            "main_filename": main_filename,
            "thumb_filename": thumb_filename,
            "image_url": f"/static/images/{main_filename}",
            "thumb_url": f"/static/images/thumbs/{thumb_filename}"
        }

    except Exception as e:
        print(f"Error processing image: {e}")
        return {
            "success": False,
            "error": str(e)
        }
