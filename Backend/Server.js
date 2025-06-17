const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket'); // ✅ Fixed spelling

// Optional: Load environment variables from .env
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// Attach Socket.IO to the HTTP server
initializeSocket(server); // ✅ Correct function name

server.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
