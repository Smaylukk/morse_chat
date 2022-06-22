const router = require('express').Router()
const userRouter = require('./UserRoute');
const authRouter = require('./AuthRoute');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.use('/user', AuthMiddleware.checkAuth, userRouter)
router.use('/auth', authRouter)

module.exports = router;