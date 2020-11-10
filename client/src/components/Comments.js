import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AddComments from '../components/AddComments'

export default function Comments() {
    const { postId } = useParams();
    const [ comments, setComments ] = useState([])
    useEffect(() => {
        fetch(`/api/v1/posts/${postId}/comments`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })
    }, [postId])
    return (
        <div>
            {comments.map((comment) => {
                return <div key={comment.id}>{` Comment Author: ${comment.author}`}<br />{`Comment: ${comment.content}`} <hr /></div>
            })}
            <AddComments comments = {comments} setComments={setComments}/>
        </div>
            )
}
