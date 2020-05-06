"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql_class_1 = __importDefault(require("../classes/mysql.class"));
var mysqlCnn = mysql_class_1.default.instance;
var ClientRouter = express_1.Router();
ClientRouter.post('/client/add', function (req, res) {
    var body = req.body;
    var pensionValid = ['AFP', 'ONP'];
    var sexValid = ['M', 'F', 'O'];
    if (!pensionValid.includes(body.pensionSystem)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los tipos de pension permitidos son: ' + pensionValid.join(', ')
            }
        });
    }
    if (!sexValid.includes(body.sex)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los generos permitidos son: ' + sexValid.join(', ')
            }
        });
    }
    var sql = "CALL afp_sp_addClient( '" + body.name + "', '" + body.surname + "', '" + body.phone + "', '" + body.sex + "', " + body.salary + ", '" + body.pensionSystem + "' );";
    mysqlCnn.onExecuteQuery(sql, function (error, data) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        res.json({
            ok: true,
            data: data[0]
        });
    });
});
ClientRouter.get('/client/chartPension', function (req, res) {
    var sql = "CALL afp_sp_chartPension();";
    mysqlCnn.onExecuteQuery(sql, function (error, data) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        res.json({
            ok: true,
            data: data
        });
    });
});
ClientRouter.get('/client/chartBar', function (req, res) {
    var sql = "CALL afp_sp_chartBar();";
    mysqlCnn.onExecuteQuery(sql, function (error, data) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        res.json({
            ok: true,
            data: data
        });
    });
});
ClientRouter.put('/client/update/:id', function (req, res) {
    var id = req.params.id || 0;
    var body = req.body;
    var pensionValid = ['AFP', 'ONP'];
    var sexValid = ['M', 'F', 'O'];
    if (!pensionValid.includes(body.pensionSystem)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los tipos de pension permitidos son: ' + pensionValid.join(', ')
            }
        });
    }
    if (!sexValid.includes(body.sex)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los generos permitidos son: ' + sexValid.join(', ')
            }
        });
    }
    var sql = "CALL afp_sp_updateClient( " + id + ", '" + body.name + "', '" + body.surname + "', '" + body.phone + "', '" + body.sex + "', " + body.salary + ", '" + body.pensionSystem + "' );";
    mysqlCnn.onExecuteQuery(sql, function (error, data) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        res.json({
            ok: true,
            data: data[0]
        });
    });
});
ClientRouter.get('/client/list', function (req, res) {
    var page = req.query.page || 1;
    var queryName = req.query.q || '';
    var querySex = req.query.qSex || '';
    var queryPension = req.query.qPension || '';
    var showInactive = req.query.showInactive || true;
    var sql = "CALL afp_sp_listClient( " + page + ", '" + queryName + "', '" + querySex + "', '" + queryPension + "', " + showInactive + " );";
    mysqlCnn.onExecuteQuery(sql, function (error, data) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        var sqlOverall = "CALL afp_sp_overallPageClient( '" + queryName + "', '" + querySex + "', '" + queryPension + "', " + showInactive + " );";
        mysqlCnn.onExecuteQuery(sqlOverall, function (errorOverall, dataOverall) {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error: errorOverall
                });
            }
            res.json({
                ok: true,
                data: data,
                total: dataOverall[0].total
            });
        });
    });
});
ClientRouter.delete('/client/delete/:id/:status', function (req, res) {
    var idClient = req.params.id || 0;
    var status = req.params.status || 'true';
    var statusValid = ['true', 'false'];
    if (!statusValid.includes(status)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Estado inválido'
            }
        });
    }
    var sql = "CALL afp_sp_deleteClient( " + idClient + ", " + status + " );";
    mysqlCnn.onExecuteQuery(sql, function (error, data) {
        if (error) {
            return res.status(400).json({
                ok: false,
                error: error
            });
        }
        res.json({
            ok: true,
            data: data[0]
        });
    });
});
exports.default = ClientRouter;
