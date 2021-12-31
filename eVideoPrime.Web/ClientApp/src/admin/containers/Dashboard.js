import React from 'react'
import { NavLink } from "react-router-dom";

export default function Dashboard() {
    return (
        <div>
            <div>
                <h1 className="mb-4">Dashboard</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <NavLink to="movies" className="text-decoration-none text-dark">
                            <div className="card border-primary mb-3">
                                <div className="card-header text-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="currentColor" className="bi bi-camera-video" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                                    </svg>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">ALL Movies</h5>
                                    <p className="card-text">A list of movies at platform</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-sm-4">
                        <NavLink to="subscriptions" className="text-decoration-none text-dark">
                            <div className="card border-primary mb-3">
                                <div className="card-header text-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="currentColor" className="bi bi-person-video" viewBox="0 0 16 16">
                                        <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z" />
                                    </svg>

                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Active Subscriptions</h5>
                                    <p className="card-text">A list of active Subscriptions at platform</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className="col-sm-4">
                        <NavLink to="users" className="text-decoration-none text-dark">
                            <div className="card border-primary mb-3">
                                <div className="card-header text-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                                        <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                                    </svg>

                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">ALL Users</h5>
                                    <p className="card-text">A list of users at platform</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
