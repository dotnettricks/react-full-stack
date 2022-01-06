import apiClient from "../helpers/apiClient";

const UsersService = {

    GetAllUsers, Delete
}

function GetAllUsers() {
    return apiClient.get('/Users/GetAllUsers')
        .then((res) => res)
        .catch((err) => err);
}

function Delete(id) {
    return apiClient.delete(`/Users/delete/${id}`)
        .then((res) => res)
        .catch((err) => err);
}

export default UsersService;