import apiClient from "../helpers/apiClient";

const SubscriptionService = {

    GetAllUserSubscription
}

function GetAllUserSubscription() {
    return apiClient.get('/Subscription/GetAllUserSubscription')
        .then((res) => res)
        .catch((err) => err);
}

export default SubscriptionService;