import {users} from '../data/users';
import { v4 as uuidv4 } from 'uuid';

const findAll:() => Promise<unknown> = () => {
    return new Promise((resolve, reject) => {
        resolve(users);
        reject(new Error("Users are wrong"))
    })
}

const findById:(id: string) => Promise<unknown> = (id) => {
    return new Promise((resolve, reject) => {
        console.log('id ------------>', id)
        console.log('users.find(user => user.id === id) ------------>', users.find(user => user.id === id))
        resolve(users.find(user => user.id === id));
        reject(new Error("User ID is wrong"))
    })
}

const create: (user: { name: string; age: number; hobbies: Array<string> }) => Promise<unknown> = (user) => {
    return new Promise((resolve, reject) => {
        const newUser:{id:string, name?: string, age?: number, hobbies?: Array<string>} = Object.assign({id: uuidv4()}, user)
        users.push({ ...newUser, id: uuidv4()})
        resolve(newUser)
        // resolve(users.push({ ...newUser, id: uuidv4()}))
        reject(new Error("User ID is wrong"))
    })
}

const update: (id:string, newData: { name: string; age: number; hobbies: Array<string> }) => Promise<unknown> = (id, newData) => {
    return new Promise((resolve, reject) => {
        const userToUpdate = users.find(user => user.id === id)
        if (userToUpdate !== undefined) {
            resolve(Object.assign(userToUpdate, newData))
        } else {
            resolve({message: "User not found"})
        }
        reject(new Error("User ID is wrong"))
    })
}

export {findAll, findById, create, update}