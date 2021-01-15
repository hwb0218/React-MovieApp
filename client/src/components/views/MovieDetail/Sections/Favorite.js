import React, {useEffect, useState} from 'react';
import Axios from "axios";
import { Button } from 'antd';
const Favorite = ({movieId, userFrom, movieInfo}) => {

    const movieTitle = movieInfo.title;
    const moviePost = movieInfo.backdrop_path;
    const movieRunTime = movieInfo.runtime;

    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const [favorited, setFavorited] = useState(false);

    const variables = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    useEffect(() => {

        Axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if(response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber);
                } else {
                    alert('숫자 정보를 가져오는데 실패 했습니다.');
                }
            });

        Axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if(response.data.success) {
                    setFavorited(response.data.favorited);
                } else {
                    alert('정보를 가져오는데 실패 했습니다.');
                }
            });
    }, []);

    const onClickFavorite = () => {
        if(favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber - 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트 제거 작업을 실패했습니다.');
                    }
                });
        } else {
            Axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(favoriteNumber + 1);
                        setFavorited(!favorited);
                    } else {
                        alert('Favorite 리스트 추가가 작업을 실패했습니다.')
                   }
                });
        }
    }

    return (
        <React.Fragment>
            <Button onClick={onClickFavorite}>{favorited ? "Not Favorite" : "Add to Favorite" } {favoriteNumber}</Button>
        </React.Fragment>
    );
};

export default Favorite;