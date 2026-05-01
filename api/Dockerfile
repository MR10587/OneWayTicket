FROM python:3.11-slim

WORKDIR /app

# Accept build-time arguments
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

# Install git so we can fetch data/ when build context is api/ (Railway sometimes
# sets the build root to the `api` folder and data/ is located at the repo root).
RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates && rm -rf /var/lib/apt/lists/*

# Install Python deps. When Railway's build context is `api/` this copies api/requirements.txt
# (present in the api folder). If build context is repo root this also works.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy API source (works whether build context is api/ or repo root if path is set correctly)
COPY . .

# If `data/` is not present (happens when build context is `api/`), clone the repo
# shallowly and copy the data directory into the image.
RUN if [ ! -d "./data" ]; then \
			git clone --depth 1 https://github.com/MR10587/OneWayTicket.git /tmp/repo && \
			cp -r /tmp/repo/data ./data && \
			rm -rf /tmp/repo; \
		fi

ENV PYTHONUNBUFFERED=1

RUN chmod +x start.sh

EXPOSE 8000

CMD ["./start.sh"]
