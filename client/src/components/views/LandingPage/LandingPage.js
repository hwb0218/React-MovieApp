import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";
import { Row, Typography } from 'antd';

const { Title } = Typography;

function LandingPage() {
    const [movies, setMovies] = useState([]);
    const [mainMovieImage, setMainMovieImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovies([...movies, ...response.results]);
                setMainMovieImage(mainMovieImage || response.results[0]);
                setCurrentPage(response.page);
            })
            .catch(error => console.error('Error:', error));
    }

    const loadMoreItems = () => {
        let endpoint = '';
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko&page=${currentPage + 1}`;
        fetchMovies(endpoint);
    }

    return (
        <div style={{ width: '100%', margin: '0' }}>
            {/* Main Image */}
            {mainMovieImage &&
            <MainImage
                image={`${IMAGE_BASE_URL}w1280${mainMovieImage.backdrop_path}`}
                title={mainMovieImage.title}
                text={mainMovieImage.overview}
            />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}>Movies by latest</Title>
                <hr/>
                {/* Movie grid Cards */}
                <Row gutter={[16, 16]}>
                {movies && movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards
                            landingPage
                            image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}
                </Row>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
