"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var mainServer_class_1 = __importDefault(require("./classes/mainServer.class"));
var mysql_class_1 = __importDefault(require("./classes/mysql.class"));
var client_route_1 = __importDefault(require("./routes/client.route"));
var server = mainServer_class_1.default.instance;
var mysqlCnn = mysql_class_1.default.instance;
server.app.use(cors_1.default({ origin: true, credentials: true }));
// parse application/x-www-form-urlencoded
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
server.app.use(body_parser_1.default.json());
server.app.use(client_route_1.default);
server.onRun(function (error) {
    if (error) {
        console.log('Error al levantar servidor express');
        return;
    }
    console.log('servidor corriendo en puerto', server.port);
    mysqlCnn.onConnect(function (error) {
        if (error) {
            console.log('Error al conextar con base de datos');
            return;
        }
        console.log('Conectado con base de datos');
    });
});
