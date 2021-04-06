const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

server.listen(PORT, () => {
    console.log(`server is up and listening on:  http://localhost:${PORT}`)
});