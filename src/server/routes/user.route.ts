import userController from "./user.controller";
import express, { response } from "express"

const router = express.Router();
router.get('/', (req: any, res: any) => {
    res.send("This route is localhost/api/user")
})
router.post('/addstate', userController.addzonestate);

router.get('/getzoneinfo', userController.getzoneinfo);
export default router;