import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import UtilService from '../services/UtilService';
import { RECEIPT_ID } from "../helpers/constant";

export default function Receipt() {
    const [receipt, setReceipt] = useState({});
    useEffect(() => {
        if (receipt.email == undefined) {
            let encdata = localStorage.getItem(RECEIPT_ID);
            if (encdata != undefined) {
                setReceipt(UtilService.Decrypt(encdata));
            }
        }
    }, [receipt])

    return (
        <div>
            <h2>Payment Status</h2>
            <hr />
            <div>
                <dl className="row">
                    <dt className="col-sm-2">
                        Email
                    </dt>
                    <dd className="col-sm-10">
                        {receipt.email}
                    </dd>
                    <dt className="col-sm-2">
                        Payment Id
                    </dt>
                    <dd className="col-sm-10">
                        {receipt.paymentId}
                    </dd>
                    <dt className="col-sm-2">
                        Total
                    </dt>
                    <dd className="col-sm-10">
                        {receipt.currency} {receipt.total}
                    </dd>
                    <dt className="col-sm-2">
                        Status
                    </dt>
                    <dd className="col-sm-10">
                        {receipt.status}
                    </dd>
                </dl>
                <div>
                    <NavLink to="/user" className="btn btn-primary">Dashboard</NavLink>
                </div>
                <br /><br />
            </div>
        </div>
    )
}
