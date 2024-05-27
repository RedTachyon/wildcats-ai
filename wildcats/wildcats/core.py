from io import BytesIO
import base64
from PIL import Image

from wildcats.prompts import SYSTEM_PROMPT, FIRST_PROMPT, FOLLOWUP_PROMPT

def downsample_image(image: Image.Image, scale: int) -> Image.Image:
    return image.resize((image.width // scale, image.height // scale))


def encode_pil(image: Image.Image, downsample: int = 1) -> str:
    if downsample > 1:
        image = downsample_image(image, downsample)

    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode("utf-8")

def get_initial_messages(task: str, image: Image.Image, downsample: int = 2):
    img_str = encode_pil(image, downsample)

    return [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": SYSTEM_PROMPT
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "data:image/png;base64," + img_str
                    }
                },
                {
                    "type": "text",
                    "text": FIRST_PROMPT % task
                }
            ]
        }
    ]