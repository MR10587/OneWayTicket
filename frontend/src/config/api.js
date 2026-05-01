const normalizeBaseUrl = (value = '') => String(value).trim().replace(/\/+$/, '');

const envBaseUrl = normalizeBaseUrl(import.meta.env.VITE_API_URL || '');

export const API_BASE_URL = envBaseUrl || (import.meta.env.PROD ? 'https://onewayticket-production-aea8.up.railway.app' : 'https://bakuflow2-ngzccisqp-mr10587s-projects.vercel.app/');

if (!envBaseUrl && import.meta.env.PROD) {
  console.info('VITE_API_URL not set at build time. Using Railway backend URL.');
}

export const requireConfiguredApiBaseUrl = () => {
  // No-op for Railway deployment
};
