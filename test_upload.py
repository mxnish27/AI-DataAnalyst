import requests

# Test backend health
print("Testing backend health...")
try:
    response = requests.get("http://localhost:8000/health")
    print(f"Health check: {response.status_code} - {response.json()}")
except Exception as e:
    print(f"Health check failed: {e}")

# Test file upload
print("\nTesting file upload...")
try:
    with open("test_data.csv", "rb") as f:
        files = {"file": ("test_data.csv", f, "text/csv")}
        response = requests.post("http://localhost:8000/upload", files=files)
        print(f"Upload status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"File uploaded successfully!")
            print(f"Rows: {data['info']['shape']['rows']}")
            print(f"Columns: {data['info']['shape']['columns']}")
            print(f"Column names: {[col['name'] for col in data['info']['columns']]}")
        else:
            print(f"Upload failed: {response.text}")
except Exception as e:
    print(f"Upload test failed: {e}")

# Test query
print("\nTesting query endpoint...")
try:
    form_data = {"query": "What are the total sales?"}
    response = requests.post("http://localhost:8000/query", data=form_data)
    print(f"Query status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"Query successful!")
        print(f"Analysis type: {result.get('analysis_type')}")
        print(f"Explanation: {result.get('explanation')[:200]}...")
    else:
        print(f"Query failed: {response.text}")
except Exception as e:
    print(f"Query test failed: {e}")
