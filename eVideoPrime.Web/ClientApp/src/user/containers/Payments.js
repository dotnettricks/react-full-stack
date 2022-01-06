import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import PaymentService from "../../services/PaymentService";
import authUser from '../../helpers/authUser';
//https://codepen.io/monsieurv/pen/abyJQWQ
//https://codesandbox.io/s/react-hooks-material-ui-pagination-example-forked-k2p4z?file=/src/App.js

export default function Payments() {
    const [payment, setPayments] = useState([]);
    const user = authUser.Get();
    useEffect(() => {
        PaymentService.GetAllUsersPayment(user.id).then(res => {
            if (res.status == 200)
                setPayments(res.data);
        });
    }, []);
    const deleteItem = function (id) {
        if (window.confirm('Are you sure to delete?')) {
            PaymentService.Delete(id).then(res => {
                if (res.status == 200) {
                    PaymentService.GetAllUsersPayment(user.id).then(res => {
                        if (res.status == 200)
                            setPayments(res.data);
                    });
                }
            });
        }
    }
    return (
        <div>
            <h2>Payment List</h2>

            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>TransactionId</th>
                        <th>Price</th>
                        <th>Currency</th>
                        <th>Tax</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>PlanName</th>
                        <th>CreatedDate</th>
                        {/* <th style={{ width: '150px' }}>Actions</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {
                        payment.map((data, index) => {
                            return <tr key={index}>
                                {/*<td>*/}
                                {/*    <img src={data.banner} style={{ height: '100px' }} />*/}
                                {/*    <div>{data.name}</div>*/}
                                {/*</td>*/}
                                <td>{data.id}</td>
                                <td>{data.price}</td>
                                <td>{data.currency}</td>
                                <td>{data.tax}</td>
                                <td>{data.total}</td>
                                <td>{data.status}</td>
                                <td>{data.planName}</td>
                                <td>{data.createdDate}</td>
                               
                                {/*<td>*/}

                                {/*    <button className="btn btn-warning" onClick={(e) => deleteItem(data.id)}>Delete</button>*/}
                                {/*</td>*/}
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
