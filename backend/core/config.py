import os
from dotenv import load_dotenv

# Load .env if it exists
load_dotenv()

# Demo Safety limits (Default values)
MAX_MODERATORS = int(os.getenv("MAX_MODERATORS", 5))
MAX_FANS = int(os.getenv("MAX_FANS", 20))
MAX_ITEMS = int(os.getenv("MAX_ITEMS", 70))
MAX_TAGS = int(os.getenv("MAX_TAGS", 20))
MAX_RARITIES = int(os.getenv("MAX_RARITIES", 10))
MAX_ACHIEVEMENTS = int(os.getenv("MAX_ACHIEVEMENTS", 20))

# Feature toggles
# By default, purge is disabled for safety in public demos
ENABLE_PURGE = os.getenv("ENABLE_PURGE", "False").lower() == "true"
