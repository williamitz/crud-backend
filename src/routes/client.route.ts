import { Request, Response, Router } from 'express';
import { IClient } from '../interfaces/client.interface';
import MysqlClass from '../classes/mysql.class';

let mysqlCnn = MysqlClass.instance;

let ClientRouter = Router();

ClientRouter.post('/client/add', (req: Request, res: Response) => {
    let body: IClient = req.body;
    let pensionValid = ['AFP', 'ONP'];
    let sexValid = ['M', 'F', 'O'];

    if ( !pensionValid.includes( body.pensionSystem ) ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los tipos de pension permitidos son: ' + pensionValid.join(', ')
            }
        });
    }

    if ( !sexValid.includes( body.sex ) ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los generos permitidos son: ' + sexValid.join(', ')
            }
        });
    }

    let sql = `CALL afp_sp_addClient( '${ body.name }', '${ body.surname }', '${ body.phone }', '${ body.sex }', ${ body.salary }, '${ body.pensionSystem }' );`;
    
    mysqlCnn.onExecuteQuery( sql, (error: any, data: any[]) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            data: data[0]
        });
    });
    
});


ClientRouter.get('/client/chartPension', (req: Request, res: Response) => {
    let sql = `CALL afp_sp_chartPension();`;
    
    mysqlCnn.onExecuteQuery( sql, (error: any, data: any[]) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            data
        });
    });
    
});

ClientRouter.get('/client/chartBar', (req: Request, res: Response) => {
    let sql = `CALL afp_sp_chartBar();`;
    
    mysqlCnn.onExecuteQuery( sql, (error: any, data: any[]) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            data
        });
    });
    
});

ClientRouter.put('/client/update/:id', (req: Request, res: Response) => {
    let id = req.params.id || 0;
    let body: IClient = req.body;
    let pensionValid = ['AFP', 'ONP'];
    let sexValid = ['M', 'F', 'O'];

    if ( !pensionValid.includes( body.pensionSystem ) ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los tipos de pension permitidos son: ' + pensionValid.join(', ')
            }
        });
    }

    if ( !sexValid.includes( body.sex ) ) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Los generos permitidos son: ' + sexValid.join(', ')
            }
        });
    }

    let sql = `CALL afp_sp_updateClient( ${ id }, '${ body.name }', '${ body.surname }', '${ body.phone }', '${ body.sex }', ${ body.salary }, '${ body.pensionSystem }' );`;
    
    mysqlCnn.onExecuteQuery( sql, (error: any, data: any[]) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            data: data[0]
        });
    });
    
});

ClientRouter.get('/client/list', (req: Request, res: Response) => {

    let page = req.query.page || 1;
    let queryName = req.query.q || '';
    let querySex = req.query.qSex || '';
    let queryPension = req.query.qPension || '';
    let showInactive = req.query.showInactive || true;

    let sql = `CALL afp_sp_listClient( ${ page }, '${ queryName }', '${ querySex }', '${ queryPension }', ${ showInactive } );`;
    
    mysqlCnn.onExecuteQuery( sql, (error: any, data: any[]) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }
        
        let sqlOverall = `CALL afp_sp_overallPageClient( '${ queryName }', '${ querySex }', '${ queryPension }', ${ showInactive } );`;

        mysqlCnn.onExecuteQuery( sqlOverall, (errorOverall: any, dataOverall: any[]) => {

            if (error) {
                return res.status(400).json({
                    ok: false,
                    error: errorOverall
                });
            }
            
            res.json({
                ok: true,
                data,
                total: dataOverall[0].total
            });
        });

    });
    
});

ClientRouter.delete('/client/delete/:id/:status', (req: Request, res: Response) => {
    let idClient = req.params.id || 0;
    let status =  req.params.status || 'true';

    let statusValid = ['true', 'false'];

    if (!statusValid.includes(status)) {
        return res.status(400).json({
            ok: false,
            error: {
                message: 'Estado inválido'
            }
        });
    }

    let sql = `CALL afp_sp_deleteClient( ${ idClient }, ${ status } );`;
    
    mysqlCnn.onExecuteQuery( sql, (error: any, data: any[]) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            data: data[0]
        });
    });
    
});

export default ClientRouter;