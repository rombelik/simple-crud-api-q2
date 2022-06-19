import 'dotenv/config'
import {createServer, IncomingMessage, ServerResponse} from 'http';
import {getUsers, getUser, createUser, updateUser, deleteUser} from "./controllers/userController";
import {URL_NOT_FOUND} from "./constants/messages";

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    try {
        if (request.url === ('/api/users') && request.method === 'GET') {
            getUsers(request, response)
        } else if (request.url !== undefined && request.url.match(/\/api\/users\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) && request.method === 'GET') {
            const id = request.url.split('/')[3]
            getUser(id, response)
        } else if (request.url === '/api/users' && request.method === 'POST') {
            createUser(request, response)
        } else if(request.url !== undefined && request.url.match(/\/api\/users\/(\d+)/) && request.method === 'PUT') {
            const id = request.url.split('/')[3]
            updateUser(id, request, response)
        } else if(request.url !== undefined && request.url.match(/\/api\/users\/(\d+)/) && request.method === 'DELETE') {
            const id = request.url.split('/')[3]
            deleteUser(id, response)
        } else {
            response.writeHead(404, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message: URL_NOT_FOUND}))
        }
    } catch (e) {
        console.error(e)
    }

});

server.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});