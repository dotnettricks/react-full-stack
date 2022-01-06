import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import UsersService from "../../services/UsersService";
//https://codepen.io/monsieurv/pen/abyJQWQ
//https://codesandbox.io/s/react-hooks-material-ui-pagination-example-forked-k2p4z?file=/src/App.js

export default function Users() {
    const [user, setUsers] = useState([]);
    useEffect(() => {
        UsersService.GetAllUsers().then(res => {
            if (res.status == 200)
                setUsers(res.data);
        });
    }, []);
    const deleteItem = function (id) {
        if (window.confirm('Are you sure to delete?')) {
            UsersService.Delete(id).then(res => {
                if (res.status == 200) {
                    UsersService.GetAllUsers().then(res => {
                        if (res.status == 200)
                            setUsers(res.data);
                    });
                }
            });
        }
    }
    return (
        <div>
            <h2>Users List</h2>

            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>PhoneNumber</th>
                        <th>CreatedDate</th>
                       {/* <th style={{ width: '150px' }}>Actions</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((data, index) => {
                            return <tr key={index}>
                                {/*<td>*/}
                                {/*    <img src={data.banner} style={{ height: '100px' }} />*/}
                                {/*    <div>{data.name}</div>*/}
                                {/*</td>*/}
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phoneNumber}</td>
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
