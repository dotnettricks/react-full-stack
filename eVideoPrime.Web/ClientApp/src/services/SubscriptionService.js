import apiClient from "../helpers/apiClient";

const SubscriptionService = {

    GetAllUserSubscription, Delete
}

function GetAllUserSubscription() {
    return apiClient.get('/Subscription/GetAllUserSubscription')
        .then((res) => res)
        .catch((err) => err);
}

function Delete(id) {
    return apiClient.delete(`/Subscription/delete/${id}`)
        .then((res) => res)
        .catch((err) => err);
}

export default SubscriptionService;