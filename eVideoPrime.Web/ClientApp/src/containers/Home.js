import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieService from "../services/MovieService";

export default function Home() {
    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
        if (movieData.length == 0) {
            MovieService.GetAll().then(res => {
                setMovieData(res.data);
            });
        }
    }, [movieData]);
    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" style={{ marginTop: "-20px" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={1} aria-label="Slide 2" />
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={2} aria-label="Slide 3" />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval={10000}>
                        <div className="row" style={{ background: 'black' }}>
                            <div className="col-sm-5 text-white">
                                <div className='container pt-5 px-5'>
                                    <h4 className='pt-5'>Mission Mangal</h4>
                                    <h6>Hindi</h6>
                                    <p className='pt-1'>Running against the clock, IAF Squadron Leader Vijay Karnik created history with determination and his love for the country. A daredevil story of guts and glory....</p>
                                </div>
                            </div>
                            <div className="col-sm-7 image-gradient"><img className='img-slider' src="images/mov-1-banner.webp" alt="..." /></div>
                        </div>
                    </div>
                    <div className="carousel-item" data-bs-interval={2000}>
                        <div className="row" style={{ background: 'black' }}>
                            <div className="col-sm-5 text-white">
                                <div className='container pt-5 px-5'>
                                    <h4 className='pt-5'>Super 30</h4>
                                    <h6>Hindi</h6>
                                    <p className='pt-1'>Based on the life of ace mathematician Anand Kumar, who trained 30 underprivileged students to crack one of the toughest entrance exams in India - IIT....</p>
                                </div>
                            </div>
                            <div className="col-sm-7 image-gradient"><img className='img-slider' src="images/mov-2-banner.webp" alt="..." /></div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row" style={{ background: 'black' }}>
                            <div className="col-sm-5 text-white">
                                <div className='container pt-5 px-5'>
                                    <h4 className='pt-5'>MS Dhoni: The Untold Story</h4>
                                    <h6>Hindi</h6>
                                    <p className='pt-1'>A tell-all tale about the life and times of Indian cricketer, Mahendra Singh Dhoni; mapping his journey; from a ticket collector to a celebrated cricketer....</p>
                                </div>
                            </div>
                            <div className="col-sm-7 image-gradient"><img className='img-slider' src="images/mov-3-banner.webp" alt="..." /></div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <h2 className="mb-3 pt-4">Hindi Movies</h2>
            <div className="row">
                {
                    movieData.map((item, index) => {
                        return <div key={index} className="col-sm-2" style={{ paddingBottom: '15px' }}>
                            <Link to={`movie/${item.id}`}>
                                <div className="card box-shadow">
                                    <img className="card-img-top" src={item.thumbnail} alt="" />
                                    <div className="card-body d-none">
                                        <h4 className="card-title">{item.name}</h4>
                                        <h6 className="card-subtitle">{item.language}</h6>
                                        <p className="card-text">{item.summary}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    })
                }
            </div>
            <h2 className="mb-3 mt-3">English Movies</h2>
            <div className="row">
                {
                    movieData.map((item, index) => {
                        return <div key={index} className="col-sm-2" style={{ paddingBottom: '15px' }}>
                            <div className="card box-shadow">
                                <img className="card-img-top" src={item.thumbnail} alt="" />
                                <div className="card-body d-none">
                                    <h4 className="card-title">{item.name}</h4>
                                    <h6 className="card-subtitle">{item.language}</h6>
                                    <p className="card-text">{item.summary}</p>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    );
}
