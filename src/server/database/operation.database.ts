
import mysql from 'mysql';
import config from '../../config/config';
import _error from '../helper/error';

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlHost,
    user: config.mysqlUserName,
    password: config.mysqlPass,
    database: config.mysqlDatabase
});

const query = (queryString: any, queryParameter: any) => new Promise((resolve, reject) => {
    connectionPool.getConnection((connectionError, connection) => {
        if (connectionError) {
            reject(_error.APIError(connectionError));
        } else {
            connection.query(
                queryString,
                Array.isArray(queryParameter) ? queryParameter : [queryParameter],
                (error: any, result) => {
                    if (error) {
                        reject(_error.MySQLError(error));
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
        }
    });
});

// async function getPool(options = {}) {
//     return await mysql.createPool(optionsClone);
// };


export default { query };