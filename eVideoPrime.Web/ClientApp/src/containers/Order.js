import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import PaymentService from '../services/PaymentService';
import UtilService from '../services/UtilService';
import { RECEIPT_ID, RAZORPAY, TAX } from "../helpers/constant";
import authUser from '../helpers/authUser';

//https://razorpay.com/docs/payment-gateway/web-integration/standard/
//https://dev.to/soumyadey/integrate-razorpay-in-your-react-app-2nib

const RAZORPAY_OPTIONS = {
    "key": "",
    "amount": "",
    "currency": "",
    "name": "",
    "description": "",
    "image": "https://www.dotnettricks.com/images/d-icon.png",
    "order_id": "",
    "handler": (res) => {
        console.log(res);
    },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": "NA"
    },
    "theme": {
        "color": "#4285F4"
    }
};

export default function Payment() {
    const [plan, setplan] = useState({});
    let navigate = useNavigate();
    const user = authUser.Get();
    useEffect(() => {
        let dataEnc = localStorage.getItem('p');
        const planData = UtilService.Decrypt(dataEnc);
        let order = { total: planData.total, currency: 'INR', receipt: 'NA' };
        PaymentService.CreateOrder(order).then((res) => {
           // console.log(res);
            if (res.status == 200) {
              //  console.log(res.data)
                RAZORPAY_OPTIONS.order_id = res.data.orderId;
            }
        }, (err) => console.log(err));

        setplan(planData);

        //append js
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const payWithRazorPay = function () {
        RAZORPAY_OPTIONS.name = user.name;
        RAZORPAY_OPTIONS.description = plan.name;
        RAZORPAY_OPTIONS.key = RAZORPAY.key;
        RAZORPAY_OPTIONS.amount = (plan.price * 100).toString();
        RAZORPAY_OPTIONS.currency = plan.currency;

        RAZORPAY_OPTIONS.prefill.name = user.name;
        RAZORPAY_OPTIONS.prefill.email = user.email;
        RAZORPAY_OPTIONS.prefill.contact = user.phoneNumber;

        // binding this object to both success and dismiss handler
        RAZORPAY_OPTIONS.handler = razorPaySuccessHandler.bind(this);

       // console.log(RAZORPAY_OPTIONS);
        //show popup
        let razorpay = new window.Razorpay(RAZORPAY_OPTIONS)
        razorpay.open();
    }

    const razorPaySuccessHandler = function (res) {
        //console.log(res);
        var payment = {
            planId: plan.id,
            planName: plan.name,
            price:plan.price,
            total: plan.total,
            tax: plan.tax,
            signature: res.razorpay_signature,
            orderId: res.razorpay_order_id,
            currency: plan.currency,
            email: user.email,
            paymentId: res.razorpay_payment_id,
            userId: user.id
        };

        //console.log(payment);
        PaymentService.SavePaymentDetails(payment).then(res => {
            //console.log(res);
            if (res.status == 200) {
                let encData = UtilService.Encrypt(res.data);
                localStorage.setItem(RECEIPT_ID, encData);

                navigate('/receipt');
            }
        });
    }

    return (
        <div className='col-sm-8'>
            <h2>Order Details</h2>
            <hr />
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                        Plan Details
                        <span>{plan.name}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                        Amount
                        <span>{plan.price}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                        Tax ({TAX.GST}%)
                        <span>+{plan.tax}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center  px-0 mb-3">
                        <strong>Total Amount</strong>
                        <span><strong>{plan.total}</strong></span>
                    </li>
                </ul>
                <a onClick={payWithRazorPay} className="btn btn-primary btn-block">Pay With RazorPay</a>
            </div>
        </div>
    )
}
