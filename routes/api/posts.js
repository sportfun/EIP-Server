/*
** Author: Sylvain Garant
** Website: https://github.com/Xobtah
*/

let router = require('express').Router();
let Post = require('mongoose').model('Post');
let mid = require('./../middlewares');

/**
* @api {GET} /api/post/:id Get post by id
* @apiName GetPost
* @apiGroup Post
*
* @apiParam {Number} id Post's ID.
*
* @apiSuccess {String} firstname Firstname of the User.
* @apiSuccess {String} lastname  Lastname of the User.
*/

router.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err)
            return (res.status(500).send({ success: false, message: err }));
        res.status(200).send(post);
    });
});

/**
* @api {POST} /api/post Post a new post
* @apiName PostPost
* @apiGroup Post
*
* @apiParam {String} content Post's content.
*
* @apiSuccess {String} firstname Firstname of the User.
* @apiSuccess {String} lastname  Lastname of the User.
*/

router.post('/', mid.token, mid.fields([ 'content' ]), (req, res) => {
    let post = new Post();
    post.content = req.fields.content;
    post.author = req.token._id;
    post.save((err) => {
        if (err)
            return (res.status(500).send({ success: false, message: err }));
        res.status(200).send({ success: true, message: 'Post has been inserted' });
    });
});

/**
* @api {DELETE} /api/post/:id Delete post by id
* @apiName DeletePost
* @apiGroup Post
*
* @apiParam {Number} id The ID of the post to delete.
*
* @apiSuccess {String} firstname Firstname of the User.
* @apiSuccess {String} lastname  Lastname of the User.
*/

router.delete('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err)
            return (res.status(500).send({ success: false, message: err }));
        post.remove((err) => {
            if (err)
                return (res.status(500).send({ success: false, message: err }));
            res.status(200).send({ success: true, message: 'Post has been deleted' });
        });
    });
});

module.exports = router;
