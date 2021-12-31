import apiClient from "../helpers/apiClient";

const PaymentService = {
    SavePaymentDetails,
    CreateOrder
}

function CreateOrder(order) {
    return apiClient.post('/payment/createorder', order)
        .then((res) => res)
        .catch((err) => err);
}

function SavePaymentDetails(model) {
    return apiClient.post('/payment/SavePaymentDetails', model)
        .then((res) => res)
        .catch((err) => err);
}

export default PaymentService;