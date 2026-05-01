FROM python:3.11-slim

WORKDIR /app

# Install git so we can fetch data/ when build context lacks it
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend sources
COPY api/ ./

# Copy data if present; if not, clone repo shallowly and copy data
RUN if [ ! -d "./data" ]; then \
      git clone --depth 1 https://github.com/MR10587/OneWayTicket.git /tmp/repo && \
      cp -r /tmp/repo/data ./data && \
      rm -rf /tmp/repo; \
    fi

ENV PYTHONUNBUFFERED=1

RUN chmod +x start.sh

EXPOSE 8000

CMD ["./start.sh"]
