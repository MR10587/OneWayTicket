import json
import os

def _resolve_data_dir() -> str:
    explicit_data_dir = os.getenv("DATA_DIR")
    if explicit_data_dir:
        return explicit_data_dir

    # Support multiple deployment contexts:
    # 1. Repository-root deployments
    # 2. Backend-root deployments (WORKDIR /app)
    # 3. Container runtime environments
    candidate_dirs = [
        # Container deployment (api/ copied to /app, so data at /app/data)
        "/app/data",
        # Local development: running from api/ directory
        os.path.join(os.path.dirname(__file__), "..", "data"),
        # Repository root (running from root)
        os.path.join(os.path.dirname(__file__), "../../..", "data"),
        # Fallback: current working directory
        os.path.join(os.getcwd(), "data"),
    ]

    for candidate in candidate_dirs:
        if os.path.isdir(candidate):
            return candidate

    return ""


DATA_DIR = _resolve_data_dir()

def load_json(filename):
    if not DATA_DIR:
        return {}

    path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(path):
        return {}

    with open(path, "r", encoding="utf-8-sig") as f:
        return json.load(f)

class DataService:
    def __init__(self):
        self.locations = load_json("locations.json")
        self.metro = load_json("metro.json") or {"stations": []}
        self.pricing = load_json("pricing.json")
        self.routes = load_json("routes.json")
        self.routes_core = load_json("routes_core.json")
        self.routes_express = load_json("routes_express.json")
        self.routes_suburbs = load_json("routes_suburbs.json")
        self.traffic = load_json("traffic.json") or {"rush_hours": []}

    def get_all_locations(self):
        return self.locations

    def get_metro_data(self):
        return self.metro

    def get_traffic_data(self):
        return self.traffic

    def get_all_routes(self):
        # Combine all route types
        all_routes = {}
        all_routes.update(self.routes_core)
        all_routes.update(self.routes_express)
        all_routes.update(self.routes_suburbs)
        # Some routes might be in routes.json too
        all_routes.update(self.routes)
        return all_routes

data_service = DataService()
