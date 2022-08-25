import express from 'express'
import user from './user.route'
const router = express.Router()

router.get('/', (req: any, res: any) => {
    res.send("This route is localhost/api")
})
router.use('/user', user);

export default router;