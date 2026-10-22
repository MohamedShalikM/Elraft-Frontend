# React + Vite

## Deployment auth configuration

Set `VITE_API_URL` in the Vercel project to the public HTTPS URL of the Render backend (for example, `https://your-api.onrender.com`, without a trailing slash), then redeploy the frontend. Vite embeds this value at build time.

Set these variables on the Render backend:

- `FRONTEND_URL`: the deployed Vercel site origin, such as `https://elraft-fashion.vercel.app` (no path or trailing slash).
- `MONGODB_URI`: the production MongoDB connection string.
- `SESSION_SECRET`: a long, stable random secret.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: the OAuth credentials.
- `CALLBACK_URL`: `https://your-api.onrender.com/auth/google/cb`; this exact URL must also be listed as an authorized redirect URI in Google Cloud.
- `NODE_ENV`: `production`.

The frontend and backend use cross-site session cookies in production, so both public URLs must use HTTPS. If you use a Vercel preview domain, add its origin to Render's `FRONTEND_URL` (comma-separated origins are accepted) and allow its callback destination in your deployment setup.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
