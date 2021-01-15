import React, {useEffect, useState, Fragment} from 'react';
import {API_KEY, API_URL, IMAGE_BASE_URL} from "../../Config";
import MainImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";
import Favorite from "./Sections/Favorite";
import Comment from "./Sections/Comment";
import {Row} from 'antd';

const MovieDetail = ({ match }) => {

    const movieId = match.params.movieId;
    const [movie, setMovie] = useState({})
    const [casts, setCasts] = useState([]);
    const [comments, setComments] = useState([]);
    const [loadingForMovie, setLoadingForMovie] = useState(true);
    const [actorToggle, setActorToggle] = useState(false);

    useEffect(() => {
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko`;
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko`;
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie({...response});
                setLoadingForMovie(false);
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast);
            })
    }, []);

    const toggleActorView = () => {
        setActorToggle(!actorToggle);
    }

    const image = () => (
        <div style={{ width: '100%'}}></div>
    )

    return (
        <div>
            {/*  Header   */}
            {!loadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
                    title={movie.title}
                    text={movie.overview}
                />
                :
                <div>loading...</div>
            }
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>

                {/* Movie Info */}
                <MovieInfo movie={movie} />
                <br/>

                {/*Actors Grid*/}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>
                </div>

                {actorToggle &&
                    <Row gutter={[16, 16]}>
                        {casts && casts.map((cast, index) => (
                            <Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    characterName={cast.name}
                                />
                            </Fragment>
                        ))}
                    </Row>
                }
                <Comment movieId={movieId} />
            </div>
        </div>
    );
};

export default MovieDetail;