from config import settings

print("Current Settings:")
print(f"OpenAI API Key: {settings.openai_api_key[:20]}...")
print(f"OpenAI Model: {settings.openai_model}")
print(f"Max File Size: {settings.max_file_size_mb}MB")
print(f"Upload Dir: {settings.upload_dir}")
