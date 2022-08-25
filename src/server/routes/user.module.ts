import mysql from 'mysql'
import query from '../database/operation.database'

const addzone = (insertValues: any) => new Promise((resolve, reject) => {
    query.query('INSERT INTO zones(`longitude`, `latitude`, `state`) VALUE (?, ?, ?)',
        [insertValues.longitude, insertValues.latitude, insertValues.state]).then((result: any) => {
        console.log(result);
        if (result.affectedRows === 1){
            resolve({
                Status: true
            });
        } else {
            reject({
                Status: false,
                Message: "AddError"
            });
        }
    }).catch((error) => { reject(error); });;
});
export default { addzone };