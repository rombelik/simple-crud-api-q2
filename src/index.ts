import 'dotenv/config'

import { createServer, IncomingMessage, ServerResponse } from 'http';

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    console.log(request)
    response.end('Hello world!');
});

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});