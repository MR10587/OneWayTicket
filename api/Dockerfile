FROM python:3.11-slim

WORKDIR /app

# Install git for fallback only
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API source code and data
COPY . .

# Ensure data directory exists by cloning if not present
		fi

ENV PYTHONUNBUFFERED=1

RUN chmod +x start.sh

EXPOSE 8000

CMD ["./start.sh"]
