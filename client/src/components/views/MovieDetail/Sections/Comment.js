import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Typography, } from 'antd';
import SingleComment from "./SingleComment";
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const Comment = ({ movieId }) => {
    const user = useSelector(state => state.user);
    const [comment, setComment] = useState('');

    const onChange = (e) => {
        setComment(e.currentTarget.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('먼저 로그인 하세요.');
        }

        const variables = {
            writer: user.userData._id,
            movieId,
            content: comment
        }
        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    alert('댓글 저장 실패');
                }
            })

    }

    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            onSubmit(e);
        }
    }

    return (
        <div>
            <br/>
            <Title level={3}>댓글 0개</Title>

            <SingleComment />

            <form style={{ display: 'flex' }} onKeyPress={onKeyPress}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px', resize: 'none' }}
                    autoSize={{ maxRows: 5 }}
                    onChange={onChange}
                    value={comment}
                />
            </form>
        </div>
    );
};

export default Comment;