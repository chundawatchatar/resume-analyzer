import app from "./app";
import { appRouter } from "./routers";

const PORT = process.env.PORT || 3001;

console.info(`🚀 Attempting to start server on port ${PORT}...`);
const server = app.listen(PORT);

// Always log this, even if error happens later
server.on('listening', () => {
  console.info(`✅ Server successfully started on port ${PORT}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
  const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

  // Friendly error messages
  switch (error.code) {
    case 'EACCES':
      console.error(`❌ ${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      console.error(`❌ ${bind} is already in use`);
      break;
    default:
      console.error(`❌ Error occurred:`, error);
      break;
  }

  process.exit(1);
});

export type AppRouter = typeof appRouter;
