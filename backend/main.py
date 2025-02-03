from fastapi import FastAPI
from pydantic import BaseModel
import requests
import socket
from fastapi.middleware.cors import CORSMiddleware
from geopy.geocoders import Nominatim
from fastapi.responses import JSONResponse

app = FastAPI()

# CORS Configuration
allowedOrigins = ["*"]  # Allow all origins or use specific URLs like ["https://example.com"]
allowedCredentials = True
allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]  # Specify allowed HTTP methods
allowedHeaders = ["X-Custom-Header", "Content-Type", "Authorization"]  # Allowed headers

# Add CORSMiddleware to handle CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowedOrigins,  # Allow specific origins
    allow_credentials=allowedCredentials,  # Allow credentials (cookies, headers)
    allow_methods=allowedMethods,  # Allow specific HTTP methods
    allow_headers=allowedHeaders,  # Allow specific headers
)

# Function to get the local IP address
def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # Try to connect to an external server (here Google's public DNS server)
        s.connect(('10.254.254.254', 1))
        local_ip = s.getsockname()[0]
    except Exception:
        local_ip = '127.0.0.1'  # Fallback to localhost if unable to connect
    finally:
        s.close()
    return local_ip

# Function to get the public IP address
def get_public_ip():
    response = requests.get('https://api64.ipify.org?format=json')
    ip_details = response.json()
    return ip_details['ip']

# Function to get geolocation based on public IP
def get_geolocation():
    response = requests.get("https://ipinfo.io/json")
    geolocation = response.json()
    loc = geolocation['loc']
    latitude, longitude = loc.split(',')
    return latitude, longitude

# Function to reverse geocode to get location from coordinates
def reverse_geocode(lat, lon):
    geolocator = Nominatim(user_agent="GetLoc")
    location = geolocator.reverse((lat, lon))
    return location.address if location else None

# Pydantic model for API response structure
class IPInfo(BaseModel):
    local_ip: str
    public_ip: str
    location: dict

@app.get("/api/ip-info", response_model=IPInfo)
async def get_ip_info():
    # Collect the required information
    local_ip = get_local_ip()
    public_ip = get_public_ip()
    latitude, longitude = get_geolocation()
    address = reverse_geocode(latitude, longitude)

    # Prepare response data
    response_data = {
        "local_ip": local_ip,
        "public_ip": public_ip,
        "location": {
            "latitude": latitude,
            "longitude": longitude,
            "address": address
        }
    }

    return JSONResponse(content=response_data)

# To run the FastAPI app:
# uvicorn main:app --reload
