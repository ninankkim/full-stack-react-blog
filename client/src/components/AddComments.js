import React, { useState } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'

export default function AddComment(props) {

    const [formOpen, setFormOpen] = useState(false);
    const [author, setAuthor] = useState('');
    const { comments, setComments } = props 
    const [content, setContent] = useState('');
    const  { postId } = useParams()

        const handleFormSubmit = (e) => {
            fetch(`/api/v1/posts/${postId}/comments`, {
                method: 'POST',
                body: JSON.stringify({
                    author: author,
                    content: content,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setFormOpen(false);
                    setComments(comments.concat(data.comment))
                })
        }
    return (
    <Modal
        trigger={<Button>Add New Comment</Button>}
        open={formOpen}
        onOpen={() => setFormOpen(true)}
        onClose={() => setFormOpen(false)}
    >
        <Modal.Header>Add a New Comment</Modal.Header>
        <Modal.Content>
            <Form id="newPostForm" onSubmit={handleFormSubmit}>
                <Form.Input required label="Author" type="text" value={author} onChange={(e) => { setAuthor(e.target.value) }} />
                <Form.TextArea required label="Content" value={content} onChange={(e) => { setContent(e.target.value) }} />
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button positive form="newPostForm">Submit</Button>
        </Modal.Actions>
    </Modal>
    )
    }

