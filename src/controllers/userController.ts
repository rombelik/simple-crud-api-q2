import {IncomingMessage, ServerResponse} from "http";
import * as User from '../models/userModel';
import {USER_ID_IS_NOT_VALID, USER_NOT_FOUND} from "../constants/messages";
import {isUUID} from "../services/uuidValidator";

const getUsers = async (request: IncomingMessage, response: ServerResponse) => {
    try {
        const users = await User.findAll();
        console.log(request.headers)
        response.writeHead(200, {'Content-Type': 'application/json'})
        response.end(JSON.stringify(users))
    } catch(e) {
        console.error(e)
    }
}

const getUser = async (id:string, response: ServerResponse) => {
    try {
        if (!isUUID(id)) {
            response.writeHead(400, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message: USER_ID_IS_NOT_VALID}))
        } else {
            const user = await User.findById(id);
            if (!user) {
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: USER_NOT_FOUND}))
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(user))
            }
        }
    } catch(e) {
        console.error(e)
    }
}

const createUser = async (request: IncomingMessage, response: ServerResponse) => {
    console.log(response)
    try {
        let result:string = '';
        request.on('data', (body) => {
            result += body.toString();
        });

        request.on('end', async () => {
            const { name, age, hobbies } = JSON.parse(result);
            const user = { name, age, hobbies };
            if (user.name === undefined) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ "message": "Error! Name is required!"}, null, 2));
            } else if (user.age === undefined) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ "message": "Error! Age is required!"}, null, 2));
            } else if (user.hobbies === undefined) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ "message": "Error! Hobbies are required!"}, null, 2));
            } else {
                const createdUser = await User.create(user);
                response.writeHead(201, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(createdUser));
            }

        })

    } catch(e) {
        console.error(e)
    }
}

const updateUser = async (id: string, request: IncomingMessage, response: ServerResponse) => {
    try {
        let result:string = '';
        request.on('data', (body) => {
            result += body.toString();
        });

        request.on('end', async () => {
            const { name, age, hobbies } = JSON.parse(result);
            const user = { name, age, hobbies };
            if (user.name === undefined) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ "message": "Error! Name is required!"}, null, 2));
            } else if (user.age === undefined) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ "message": "Error! Age is required!"}, null, 2));
            } else if (user.hobbies === undefined) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ "message": "Error! Hobbies are required!"}, null, 2));
            } else {
                const createdUser = await User.update(id, user)
                response.writeHead(201, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(createdUser));
            }
        })

    } catch(e) {
        console.error(e)
    }
}

const deleteUser = async (id:string, response: ServerResponse) => {
    try {
        if (!isUUID(id)) {
            response.writeHead(400, {'Content-Type': 'application/json'})
            response.end(JSON.stringify({message: USER_ID_IS_NOT_VALID}))
        } else {
            const user = await User.findById(id);
            if (!user) {
                response.writeHead(404, {'Content-Type': 'application/json'})
                response.end(JSON.stringify({message: USER_NOT_FOUND}))
            } else {
                await User.delete(id)
                response.writeHead(204, {'Content-Type': 'application/json'})
                response.end(JSON.stringify(user))
            }
        }
    } catch(e) {
        console.error(e)
    }
}

export {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}
