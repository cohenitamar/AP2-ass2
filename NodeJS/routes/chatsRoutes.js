const chatsController = require('../controllers/chatsController');

const express = require('express');
var router = express.Router();

router.route('/')
    .post(chatsController.postChats)
    .get(chatsController.getChats);



router.route('/:id')
    .get(chatsController.getMessagesById)


router.route('/:id/Messages')
    // id = req.params.id
    // text = req.body.msg
    .post(chatsController.sendMessage)
    .get(chatsController.getOnlyMessages);





module.exports = router;