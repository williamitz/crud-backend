"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var environment_1 = require("../environment/environment");
var MysqlClass = /** @class */ (function () {
    function MysqlClass() {
        this.host = environment_1.HOST;
        this.user = environment_1.USER;
        this.password = environment_1.PASS;
        this.database = environment_1.DATABASE;
        this.conn = mysql_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }
    Object.defineProperty(MysqlClass, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    MysqlClass.prototype.onConnect = function (callback) {
        this.conn.connect(callback());
    };
    MysqlClass.prototype.onEndConnect = function (callback) {
        this.conn.end(callback());
    };
    MysqlClass.prototype.onExecuteQuery = function (sql, callback) {
        this.conn.query(sql, function (error, result, fields) {
            if (error) {
                console.log('Error al procesar query ===> ', sql);
                console.log(error);
                return callback(error, []);
            }
            return callback(null, result[0]);
        });
    };
    return MysqlClass;
}());
exports.default = MysqlClass;
