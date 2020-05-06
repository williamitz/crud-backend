import mysql, { MysqlError } from 'mysql';
import { HOST, USER, PASS, DATABASE } from '../environment/environment';

export default class MysqlClass {

    private static _instance: MysqlClass;
    
    host: string;
    user: string;
    password: string;
    database: string;

    conn: mysql.Connection;

    constructor() {
        this.host = HOST;
        this.user = USER;
        this.password = PASS;
        this.database = DATABASE;

        this.conn = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            password : this.password,
            database : this.database
        });
    }

    static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    onConnect( callback: Function ) {
        this.conn.connect( callback() );
    }

    onEndConnect( callback: Function ) {
        this.conn.end( callback() );
    }

    onExecuteQuery( sql: string, callback: Function ) {
        this.conn.query( sql, ( error: any, result: object[], fields: any ) => {
            if( error ) {
                console.log('Error al procesar query ===> ', sql);
                console.log(error);
                return callback( error , [] );                
            }

            return callback( null,  result[0] );
        });
    }
}