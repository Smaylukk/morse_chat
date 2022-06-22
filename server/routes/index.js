const router = require('express').Router()
const userRouter = require('./userRoute');
const authRouter = require('./authRoute');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/user', authMiddleware.checkAuth, userRouter)
router.use('/auth', authRouter)

module.exports = router;
