import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import MovieService from '../services/MovieService';

export default function Player() {
    const [video, setVideo] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (video == '') {
            MovieService.Get(id).then(res => {
                //console.log(res.data);
                setVideo(res.data);
            });
        }
    }, [video])
    return (<div style={{ marginTop: '-15px'}}>
        <iframe style={{ width: '100%', height: '90vh' }} src={video.videoUrl} frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </div>
    )
}
