import express from 'express';
import { PORT } from '../environment/environment';

export default class MainServerClass {

    private static _instance: MainServerClass;

    port: number;
    app: express.Application;

    constructor() {
        this.port = PORT;
        this.app = express();
    }

    static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    onRun( callback: Function ) {
        this.app.listen( this.port, callback());
    }
}