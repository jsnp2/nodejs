const express =  require('express');
const authMiddleWare = require('../middlewares/auth');


const router = express.Router();


router.use(authMiddleWare);

router.get('/', (req, res ) => {
    res.send({ok: true, user: req.userId});

});

module.exports = app => app.use('/projects',  router);