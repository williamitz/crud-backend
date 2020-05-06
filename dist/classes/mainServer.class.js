"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var environment_1 = require("../environment/environment");
var MainServerClass = /** @class */ (function () {
    function MainServerClass() {
        this.port = environment_1.PORT;
        this.app = express_1.default();
    }
    Object.defineProperty(MainServerClass, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    MainServerClass.prototype.onRun = function (callback) {
        this.app.listen(this.port, callback());
    };
    return MainServerClass;
}());
exports.default = MainServerClass;
