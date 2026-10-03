// import path from 'path';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';
// import { defineConfig } from 'vite';

// import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

// const rawPort = process.env.PORT;

// if (!rawPort) {
//   throw new Error(
//     'PORT environment variable is required but was not provided.',
//   );
// }

// const port = Number(rawPort);

// if (Number.isNaN(port) || port <= 0) {
//   throw new Error(`Invalid PORT value: "${rawPort}"`);
// }

// const basePath = process.env.BASE_PATH;

// if (!basePath) {
//   throw new Error(
//     'BASE_PATH environment variable is required but was not provided.',
//   );
// }

// export default defineConfig({
//   base: basePath,
//   plugins: [
//     react(),
//     tailwindcss(),
//     runtimeErrorOverlay(),
//     ...(process.env.NODE_ENV !== 'production' &&
//     process.env.REPL_ID !== undefined
//       ? [
//           await import('@replit/vite-plugin-cartographer').then((m) =>
//             m.cartographer({
//               root: path.resolve(import.meta.dirname, '..'),
//             }),
//           ),
//           await import('@replit/vite-plugin-dev-banner').then((m) =>
//             m.devBanner(),
//           ),
//         ]
//       : []),
//   ],
//   resolve: {
//     alias: {
//       '@': path.resolve(import.meta.dirname, 'src'),
//       '@assets': path.resolve(
//         import.meta.dirname,
//         '..',
//         '..',
//         'attached_assets',
//       ),
//     },
//     dedupe: ['react', 'react-dom'],
//   },
//   root: path.resolve(import.meta.dirname),
//   build: {
//     outDir: path.resolve(import.meta.dirname, 'dist/public'),
//     emptyOutDir: true,
//   },
//   server: {
//     port,
//     strictPort: true,
//     host: '0.0.0.0',
//     allowedHosts: true,
//     fs: {
//       strict: true,
//     },
//   },
//   preview: {
//     port,
//     host: '0.0.0.0',
//     allowedHosts: true,
//   },
// });



















import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

// Use a fallback port for Netlify/production builds.
// Replit can still provide its own PORT during development.
const rawPort = process.env.PORT || '5173';
const port = Number(rawPort);

// Use root path when BASE_PATH is not provided.
const basePath = process.env.BASE_PATH || '/';

export default defineConfig({
  base: basePath,

  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),

    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),

      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },

    dedupe: ['react', 'react-dom'],
  },

  root: path.resolve(import.meta.dirname),

  build: {
    // Netlify is configured to publish the "dist" folder.
    outDir: path.resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },

  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,

    fs: {
      strict: true,
    },
  },

  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
