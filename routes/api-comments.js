var express = require('express');
var router = express.Router();
var models = require('../models');

//PUT /api/v1/comments/:commentId
router.put('/:commentId', (req, res) => {
    if (!req.body || !req.body.author || !req.body.content || (!req.body.approved && req.body.approved !== false)) {
        res.status(400).json({
            error: 'Please submit all required fields!'
        })
        return;
    }

    models.Comment.update({
        author: req.body.author,
        content: req.body.content,
        approved: req.body.approved !== 'false' && req.body.approved !== 'false' ? true : false
    }, {
        where: {
            id: req.params.commentId
        }
    })
        .then(updated => {
            if (updated && updated[0] === 1) {
                res.status(202).json({
                    success: 'Comment is updated'
                });
            } else {
                res.status(404).json({
                    error: 'Comment not found'
                })
            }
        })
})


//DELETE /api/v1/comments/:commentId
router.delete('/:commentId', (req, res) => {
    models.Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(deleted => {
            if (deleted === 1) {
                res.status(202).json({
                    success: 'Comment is deleted'
                })
            } else {
                res.status(404).json({
                    error: 'Comment not found'
                })
            }
        })
})



module.exports = router;