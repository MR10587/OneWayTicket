# Railway Deployment Guide

## Setup Instructions

### 1. Backend Service (Python/FastAPI)

**Create Backend Service:**
- New Service → GitHub Repo
- Select this repo
- Build Settings:
  - Builder: Dockerfile
  - Dockerfile Path: `api/Dockerfile`

**Add Environment Variables:**
- `GEMINI_API_KEY`: Your API key
- `CORS_ORIGIN_REGEX`: `https://.*\.railway\.app`

**Get Backend URL:**
- After deployment, note the public URL (e.g., `https://onewayticket-production-aea8.up.railway.app`)

---

### 2. Frontend Service (React/Vite)

**Create Frontend Service:**
- New Service → GitHub Repo
- Select this repo
- Build Settings:
  - Builder: Dockerfile
  - Dockerfile Path: `frontend/Dockerfile`
  - **Build Args:** (Add these)
    - `VITE_API_URL`: `https://[BACKEND_URL_FROM_STEP1]`
  
  Replace `[BACKEND_URL_FROM_STEP1]` with the actual backend URL

**No additional environment variables needed for Frontend.**

---

### 3. Verify Deployment

1. Open Frontend URL
2. Check browser console (DevTools → Console)
3. Go to Planner page
4. Try selecting locations in the dropdown
5. Network tab should show successful `/locations` API calls to backend

---

## Troubleshooting

### Locations Dropdown Empty
- Check console for errors
- Verify `VITE_API_URL` includes full backend URL with protocol (`https://...`)
- Check Network tab for 404/CORS errors

### CORS Errors
- Ensure Backend `CORS_ORIGIN_REGEX` is set to `https://.*\.railway\.app`
- Redeploy backend after changing env vars

### Build Failures
- Ensure Dockerfile paths are correct
- Check build logs in Railway
