import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
/**
 * Import your Room files
 */
import { MyRoom } from "../server/rooms/MyRoom";
import morgan from "morgan";
import bodyParser from 'body-parser'
import cors from 'cors'
import index from '../server/routes/index.route'
export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('my_room', MyRoom);

    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cors());
        app.use(morgan('dev'));
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
        app.use("/api", index);
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});