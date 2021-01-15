import React from 'react';
import { Col } from 'antd';

const GridCards = ({image, movieId, movieName, landingPage, characterName}) => {

    if (landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${movieId}`}>
                        <img style={{ width: '100%', height: '320px'}} src={image} alt={movieName}/>
                    </a>
                </div>
            </Col>
        );
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    {image
                        ? <img style={{ width: '100%', height: '320px'}} src={image} alt={characterName}/>
                        : <div style={{ width: '100%', height: '320px',
                            backgroundColor: 'gray', display: 'flex',
                            justifyContent: 'center', alignItems: 'center' }}>{characterName}</div>
                    }
                </div>
            </Col>
        );
    }
};

export default GridCards;