import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import SubscriptionService from "../../services/SubscriptionService";
//https://codepen.io/monsieurv/pen/abyJQWQ
//https://codesandbox.io/s/react-hooks-material-ui-pagination-example-forked-k2p4z?file=/src/App.js

export default function Subscriptions() {
    const [subscription, setSubscriptions] = useState([]);
    useEffect(() => {
        SubscriptionService.GetAllUserSubscription().then(res => {
            if (res.status == 200)
                setSubscriptions(res.data);
        });
    }, []);
    const deleteItem = function (id) {
        if (window.confirm('Are you sure to delete?')) {
            SubscriptionService.Delete(id).then(res => {
                if (res.status == 200) {
                    SubscriptionService.GetAllUserSubscription().then(res => {
                        if (res.status == 200)
                            setSubscriptions(res.data);
                    });
                }
            });
        }
    }
    return (
        <div>
            <h2>Subscription List</h2>
          
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SubscribedOn</th>
                        <th>ExpiryOn</th>
                        <th>Plan</th>
                        <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        subscription.map((data, index) => {
                            return <tr key={index}>
                                {/*<td>*/}
                                {/*    <img src={data.banner} style={{ height: '100px' }} />*/}
                                {/*    <div>{data.name}</div>*/}
                                {/*</td>*/}
                                <td>{data.userName}</td>
                                <td>{data.subscribedOn}</td>
                                <td>{data.expiryOn}</td><td>{data.planName}</td>
                                <td>
                                  
                                    <button className="btn btn-warning" onClick={(e) => deleteItem(data.id)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
