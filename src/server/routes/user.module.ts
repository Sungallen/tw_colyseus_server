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

const getzoneinfo = (insertValues: any) => new Promise((resolve, reject) => {
    query.query('SELECT * FROM zones WHERE (longitude <= ? and longitude >= ?) and (latitude <= ? and latitude >= ?)',
    [insertValues.EastBound, insertValues.WestBound, insertValues.NorthBound, insertValues.SouthBound]).then((result: any) => {
        if(result.length > 0) {
            resolve(result); 
        } else {
            reject('No data exist.');
        }
    }).catch((error) => { reject(error); });
})
export default { addzone, getzoneinfo };