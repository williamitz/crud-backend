import { PORT } from "./environment/environment";
import cors from 'cors';
import bodyParser from 'body-parser';
import MainServerClass from './classes/mainServer.class';
import MysqlClass from './classes/mysql.class';
import ClientRouter from "./routes/client.route";

const server = MainServerClass.instance;
const mysqlCnn = MysqlClass.instance;
server.app.use( cors( { origin: true, credentials: true } ) );

// parse application/x-www-form-urlencoded
server.app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
server.app.use(bodyParser.json());

server.app.use( ClientRouter );

server.onRun( (error: any) => {
    if (error) {
        console.log('Error al levantar servidor express');
        return;
    }
    console.log('servidor corriendo en puerto', server.port);
    mysqlCnn.onConnect( (error) => {
        if (error) {
            console.log('Error al conextar con base de datos');
            return;
        }

        console.log('Conectado con base de datos');
    })
});
