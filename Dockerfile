FROM python:3.11-slim

WORKDIR /app

# Accept build-time arguments
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

# Install dependencies
COPY api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend sources and data directory
COPY api/ ./
COPY data/ ./data/

ENV PYTHONUNBUFFERED=1

RUN chmod +x start.sh

EXPOSE 8000

CMD ["./start.sh"]
