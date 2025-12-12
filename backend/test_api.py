import requests

print("=" * 50)
print("Testing AI Data Analyst Backend")
print("=" * 50)

# Test 1: Health check
print("\n1. Health Check...")
r = requests.get("http://localhost:8000")
print(f"   Status: {r.status_code}")

# Test 2: Upload file
print("\n2. Uploading test file...")
with open("../test_data.csv", "rb") as f:
    files = {"file": ("test_data.csv", f, "text/csv")}
    r = requests.post("http://localhost:8000/upload", files=files)
    print(f"   Status: {r.status_code}")
    if r.status_code == 200:
        print(f"   Message: {r.json().get('message', 'OK')}")
    else:
        print(f"   Error: {r.text}")

# Test 3: AI Query
print("\n3. Testing AI Query...")
r = requests.post("http://localhost:8000/query", data={"query": "What is the total sales?"})
print(f"   Status: {r.status_code}")
result = r.json()
print(f"   Analysis Type: {result.get('analysis_type', 'N/A')}")
explanation = result.get("explanation", "NO RESPONSE")
print(f"   Explanation: {explanation[:300]}...")

print("\n" + "=" * 50)
print("TEST COMPLETE")
print("=" * 50)
