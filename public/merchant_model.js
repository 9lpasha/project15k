const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '959595Pashok',
    port: 5432,
});

const getMerchants = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        SELECT m.id, m.name, m.alias, d.textInfo
        FROM merchants as m LEFT JOIN decryption as d
        ON m.alias = d.alias ORDER BY m.id
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(results.rows);
        })
    })
}

const editRecord = (req) => {
    let {value, id, field} = req.body
    console.log(req.body)
    return new Promise(function (resolve, reject) {
        if (field == 'id' || field == 'name')
            pool.query(`UPDATE merchants SET ${field} = '${value}' WHERE id = ${id}`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results);
            })
        if (field == 'alias')
            pool.query(`UPDATE merchants SET alias = '${value}' WHERE alias = '${id}';
                        UPDATE decryption SET alias = '${value}' WHERE alias = '${id}'
                        `, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results);
            })
        if (field == 'textinfo')
            pool.query(`UPDATE decryption SET textInfo = '${value}' WHERE alias = '${id}'`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results);
            })
    }).then(() => {
            return new Promise(function (resolve, reject) {
                pool.query(`
                    SELECT m.id, m.name, m.alias, d.textInfo
                    FROM merchants as m LEFT JOIN decryption as d
                    ON m.alias = d.alias order by m.id
                    `, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(results.rows);
                })
            })
        }
    )
}

const deleteRecord = (req) => {
    let {id, alias} = req.body
    console.log(req.body)
    return new Promise(function (resolve, reject) {
        pool.query(`DELETE FROM merchants WHERE id = ${id};
                    DELETE FROM decryption WHERE alias = '${alias}'
            `, (error, results) => {
            if (error) {
                reject(error)
                console.log(error)
            }
            resolve(results);
        })
    }).then(() => {
            return new Promise(function (resolve, reject) {
                pool.query(`
                    SELECT m.id, m.name, m.alias, d.textInfo
                    FROM merchants as m LEFT JOIN decryption as d
                    ON m.alias = d.alias order by m.id
                    `, (error, results) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(results.rows);
                })
            })
        }
    )
}

const insertRecord = (req) => {
    let {id, name, alias, textinfo} = req.body
    console.log(req.body)
    return new Promise(function (resolve, reject) {
        pool.query(`INSERT INTO merchants (id, name, alias) VALUES (${id}, '${name}', '${alias}');
                    INSERT INTO decryption (alias, textInfo) VALUES ('${alias}', '${textinfo}')
            `, (error, results) => {
            if (error) {
                reject(error)
                console.log(error)
            }
            resolve(results);
        })
    }).then(() => {
            return new Promise(function (resolve, reject) {
                pool.query(`
                    SELECT m.id, m.name, m.alias, d.textInfo
                    FROM merchants as m LEFT JOIN decryption as d
                    ON m.alias = d.alias order by m.id
                    `, (error, results) => {
                    if (error) {
                        reject(error)
                        console.log(error)
                    }
                    resolve(results.rows);
                })
            })
        }
    )
}

const createFirstTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        CREATE TABLE merchants
(
    id numeric PRIMARY KEY,
    name text,
    alias varchar(2)
);
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 1 создана'));
        })
    })
}

const createSecondTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        CREATE TABLE decryption
(
    alias varchar(2) PRIMARY KEY,
    textInfo text
);
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 2 создана'));
        })
    })
}

const fillingFirstTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        INSERT INTO merchants VALUES (1, 'Павел', 'pc'), (2, 'Александр', 'al'), (3, 'Роман', 're'), (4, 'Арсений', 'ag'), 
        (5, 'Никита', 'nt'), (6, 'Ярослав', 'yu'), (7, 'Максим', 'mk'), (8, 'Камиль', 'kl'), (9, 'Сергей', 'sr'), 
        (10, 'Борис', 'bo')
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 1 заполнена'));
        })
    })
}

const fillingSecondTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        INSERT INTO decryption VALUES ('pc', 'программист'), ('al', 'менеджер'), ('re', 'аналитик'), ('ag', 'контент-менеджер'), 
        ('nt', 'директор'), ('yu', 'физик'), ('mk', 'химик'), ('kl', 'математик'), ('sr', 'Dev0ps'), 
        ('bo', 'дирижёр')
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 2 заполнена'));
        })
    })
}

module.exports = {
    getMerchants,
    createFirstTable,
    createSecondTable,
    fillingFirstTable,
    fillingSecondTable,
    editRecord,
    deleteRecord,
    insertRecord
}