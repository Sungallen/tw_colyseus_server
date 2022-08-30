import { BodyParser } from "body-parser";
import userModule from "./user.module";

const addzonestate = (req: any, res: any) => {
    const insertValues = req.body;
    userModule.addzone(insertValues).then((result: any) => {
        res.send(result);
    }).catch(err => {res.send(err)});
};

const getzoneinfo = (req: any, res: any) => {
    const insertValues = req.body;
    userModule.getzoneinfo(insertValues).then((result: any) => {
        res.send(result);
    }).catch(err => {res.send(err)});
}

export default { addzonestate, getzoneinfo };