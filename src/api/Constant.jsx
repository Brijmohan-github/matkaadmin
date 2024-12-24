let BASE_API_URL;

if (import.meta.env.VITE_DEV == "true") {
  // npm run dev command
  BASE_API_URL = import.meta.env.VITE_API_URL_DEV;
} else if (import.meta.env.MODE == "production") {
  // for npm run build command
  BASE_API_URL = import.meta.env.VITE_API_URL_PROD;
} else if (import.meta.env.VITE_DEV == "false") {
  // for npm run prod command
  BASE_API_URL = import.meta.env.VITE_API_URL_PROD;
}

export { BASE_API_URL };
