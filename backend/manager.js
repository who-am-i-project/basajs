import { User } from './user';

const users = [];

function addUser(id, username) {
    let curUser = User(id, username);
    users.push(curUser);
    return curUser;
}

function getUser(id) {
    return users.find((u) => u.id === id);
}

function removeUser(id) {
    let idx = users.findIndex((u) => u.id === id);
    if (idx !== -1) {
        return users.splice(idx, 1)[0];
    }
}

export {
    addUser,
    getUser,
    removeUser
};