var express = require('express');
var router = express.Router();
var models = require('../models');

//GET ALL POSTS
router.get('/', function (req, res) {
  models.Post.findAll()
    .then(posts => {
      res.json(posts)
    })
});

//GET 1 POST BY ID 

router.get('/:id', (req, res) => {
  models.Post.findByPk(req.params.id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        res.status(400).json({
          error: 'Post not found'
        })
      }
    })
})

//UPDATE POST
router.put('/', (req, res) => {
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published) {
    res.status(400).json({
      error: 'Please submit all required fields!'
    })
    return;
  }
  models.Post.update({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(updated => {
      if (updated & updated[0] === 1) {
        res.status(202).json({
          success: 'Post is updated'
        });
      } else {
        res.status(404).json({
          error: 'Post not found'
        })
      }
    })
})

//CREATE NEW POST
router.get('/', (req, res) => {
  if (!req.body || !req.body.author || !req.body.title || !req.body.content || !req.body.published) {
    res.status(400).json({
      error: 'Please submit all required fields!'
    })
    return;
  }
  models.Post.create({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    published: req.body.published
  })
    .then(post => {
      res.status(201).json(post)
    })
})


//DELETE POST
router.delete('/:id', (req, res) => {
  models.Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(deleted => {
      if (deleted === 1) {
        res.status(202).json({
          success: 'Post is deleted'
        })
      } else {
        res.status(404).json({
          error: 'Post not found'
        })
      }
    })
})

// CRUD OR BREAD = BROWSE, READ, EDIT, ADD, DELETE
//BROWSE GETS ALL POSTS
//READ GETS 1 POST BY ID 
//EDIT IS UPDATING POST
//CREATE NEW POST
//DELETE THE POST 

module.exports = router;
