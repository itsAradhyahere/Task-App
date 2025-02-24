const API_VERSION = "/api/v1";
const SECRET = import.meta.env.VITE_API_KEY;

export const API_URL = `https://${SECRET}.mockapi.io${API_VERSION}/tasks`;
