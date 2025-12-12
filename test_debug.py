import requests
import json

print("Testing AI Query with Debug Info...")

# First upload file
print("\n1. Uploading file...")
with open("test_data.csv", "rb") as f:
    files = {"file": ("test_data.csv", f, "text/csv")}
    r = requests.post("http://localhost:8000/upload", files=files, timeout=15)
    if r.status_code == 200:
        print("   ✓ File uploaded")
    else:
        print(f"   ✗ Upload failed: {r.text}")
        exit(1)

# Test query and show full response
print("\n2. Testing query...")
data = {"query": "What are the total sales?"}
r = requests.post("http://localhost:8000/query", data=data, timeout=30)

print(f"\nStatus Code: {r.status_code}")
print(f"\nFull Response:")
print(json.dumps(r.json(), indent=2))

# Check each field
result = r.json()
print(f"\n--- Field Analysis ---")
print(f"query: '{result.get('query')}'")
print(f"analysis_type: '{result.get('analysis_type')}'")
print(f"explanation: '{result.get('explanation')}'")
print(f"explanation length: {len(result.get('explanation', ''))}")
print(f"data: {result.get('data')}")
print(f"visualization: {result.get('visualization')}")
