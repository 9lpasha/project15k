const {tab} = require("@testing-library/user-event/dist/tab");
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'database15k',
    password: '959595Pashok',
    port: 5432,
});

const getCompanies = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        SELECT * from companies order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([3, 4, 5, 6, 7, 8]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            pool.query(`
                SELECT SUM(area), company FROM objects group by company
            `, (error, results2) => {
                let sums = results2.rows
                changedAr.forEach((el) => {
                    let findd = sums.find((el2) => {
                        return el2.company == el.name
                    })
                    if (findd)
                        el.area = findd.sum
                    else el.area = ''
                })
                pool.query(`
                SELECT SUM(money), company FROM yur group by company
            `, (error, results30) => {
                    let moneys = results30.rows
                    changedAr.forEach((el) => {
                        let findd = moneys.find((el2) => {
                            return el2.company == el.name
                        })
                        if (findd)
                            el.money = findd.sum
                        else el.money = ''
                    })
                    let numOfNotEmpty = 0
                    changedAr.forEach((el) => {
                        if (el.name) numOfNotEmpty += 1
                    })
                    resolve([changedAr, numOfNotEmpty])
                })
            })
        })
    })
}


const getObjects = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        SELECT * from objects order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([2, 8]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            let numOfNotEmpty = 0
            changedAr.forEach((el) => {
                if (el.name) numOfNotEmpty += 1
            })
            resolve([changedAr, numOfNotEmpty])
        })
    })
}

const getContacts = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        SELECT * from contacts order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([10, 12]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            let numOfNotEmpty = 0
            changedAr.forEach((el) => {
                if (el.name) numOfNotEmpty += 1
            })
            resolve([changedAr, numOfNotEmpty])
        })
    })
}

const getYur = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        SELECT * from yur order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            let numOfNotEmpty = 0
            changedAr.forEach((el) => {
                if (el.name) numOfNotEmpty += 1
            })
            resolve([changedAr, numOfNotEmpty])
        })
    })
}

const getCompanyNames = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        select DISTINCT name from companies
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el, i) => {
                if (el.name == null) {
                    changedAr.splice(i, 1)
                }
            })
            resolve(changedAr);
        })
    })
}

const getObjectNames = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        select DISTINCT name from objects
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el, i) => {
                if (el.name == null) {
                    changedAr.splice(i, 1)
                }
            })
            resolve(changedAr);
        })
    })
}

const editRecord = (req) => {
    let {value, id, field, table, num} = req.body
    let reloadOrNot = 0
    console.log(req.body)
    return new Promise(function (resolve, reject) {
        if (value == '')
            pool.query(`UPDATE ${table} SET ${field} = NULL WHERE id = ${id}`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve();
            })
        else
            pool.query(`UPDATE ${table} SET ${field} = '${value}' WHERE id = ${id}`, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve();
            })
    }).then(() => {
        return new Promise(function (resolve, reject) {
            console.log('второй промисс')
            if (field == 'name') {
                pool.query(`
                UPDATE ${table} set data = CURRENT_DATE where id = ${id}
            `, (error, results10) => {
                    if (error) {
                        reject(error)
                    }
                    resolve()
                })
            } else resolve()
        })
    }).then(() => {
        return new Promise(function (resolve, reject) {
            console.log('третий промисс')
            pool.query(`
                select ${table} from numbertable
            `, (error, results10) => {
                if (error) {
                    reject(error)
                }
                console.log(results10.rows[0][`${table}`])
                resolve(results10.rows[0][`${table}`])
            })
        })
    }).then((number) => {
        return new Promise(function (resolve, reject) {
            console.log('четвёртый промисс', Number(number))
            if (num > Number(number) + 1 && value)
                reloadOrNot = 1
            if (num > Number(number) && value) {
                pool.query(`
                UPDATE numbertable set ${table} = (select ${table} from numbertable) + 1
            `, (error, results10) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(number)
                })
            } else resolve(number)
        })
    }).then((number) => {
        return new Promise(function (resolve, reject) {
            console.log('пятый промисс')
            if (num > Number(number) && value) {
                console.log('должно работать')
                pool.query(`
                UPDATE ${table} set idsort = (select ${table} from numbertable) where id = ${id}
            `, (error, results11) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(number)
                })
            }
            resolve(number)
        })
    }).then((number) => {
        return new Promise(function (resolve, reject) {
            console.log('пятый промисс')
            if (num > Number(number) && value) {
                console.log('должно работать')
                pool.query(`
                INSERT INTO ${table} (name) values (NULL)
            `, (error, results11) => {
                    if (error) {
                        reject(error)
                    }
                    resolve()
                })
            }
            resolve()
        })
    }).then(() => {
        return new Promise(function (resolve, reject) {
            pool.query(`
                    SELECT * from ${table} order by idsort
                    `, (error, results) => {
                if (error) {
                    reject(error)
                }
                let changedAr = results.rows
                changedAr.forEach((el) => {
                    Object.keys(el).map((el2, i) => {
                        if (table == 'companies')
                            if (new Set([3, 4, 5, 6, 7, 8]).has(i)) {
                                if (el[el2] == null)
                                    el[el2] = []
                                else {
                                    el[el2] = [...el[el2].split(';')]
                                }
                            }
                        if (table == 'objects')
                            if (new Set([2, 8]).has(i)) {
                                if (el[el2] == null)
                                    el[el2] = []
                                else {
                                    el[el2] = [...el[el2].split(';')]
                                }
                            }
                        if (table == 'contacts')
                            if (new Set([10, 12]).has(i)) {
                                if (el[el2] == null)
                                    el[el2] = []
                                else {
                                    el[el2] = [...el[el2].split(';')]
                                }
                            }
                    })
                    resolve(changedAr)
                })
            })
        })
    }).then((changedAr) => {
        return new Promise(function (resolve, reject) {
            console.log('шестой промисс')
            let numOfNotEmpty = 0
            changedAr.forEach((el) => {
                if (el.name) numOfNotEmpty += 1
            })
            let numOfEmptynum
            let empty = 0
            let idsort
            console.log('начало прохода')
            changedAr.forEach((el) => {
                let empty2 = 0
                if (empty == 0) {
                    Object.keys(el).map((el2) => {
                        if (el2 != 'id' && el2 != 'data' && el2 != 'idsort')
                            if (el[el2] != '' && el[el2] != ' ' && el[el2] != null && el[el2] != []) {
                                empty2 += 1
                            }
                    })
                    if (empty2 == 0) {
                        idsort = el.idsort
                        console.log(empty2)
                        numOfEmptynum = el.id
                        empty = 1
                    }
                }
            })
            console.log('конец прохода')
            console.log(numOfEmptynum)
            if (num <= numOfNotEmpty + 1 && idsort) {
                reloadOrNot = 1
                console.log('должно работать')
                pool.query(`
                UPDATE ${table} set idsort = NULL where id = ${numOfEmptynum}
            `, (error, results11) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(1)
                })
            } else
                resolve(0)
        })
    }).then((prev) => {
        return new Promise(function (resolve, reject) {
            console.log('четвёртый промисс', prev)
            if (prev == 1)
                pool.query(`
                UPDATE numbertable set ${table} = (select ${table} from numbertable) - 1
            `, (error, results10) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(prev)
                })
            resolve(prev)
        })
    }).then((prev) => {
        return new Promise(function (resolve, reject) {
            console.log('четвёртый промисс', prev)
            if (prev == 1)
                pool.query(`
                delete from ${table} where id = (select max(id) from ${table})
            `, (error, results10) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(prev)
                })
            resolve(prev)
        })
    }).then(() => {
        return new Promise(function (resolve, reject) {
            pool.query(`
                    SELECT * from ${table} order by idsort
                    `, (error, results) => {
                if (error) {
                    reject(error)
                }
                let changedAr = results.rows
                changedAr.forEach((el) => {
                    delete el.idsort
                })
                changedAr.forEach((el) => {
                    Object.keys(el).map((el2, i) => {
                        if (table == 'companies')
                            if (new Set([3, 4, 5, 6, 7, 8]).has(i)) {
                                if (el[el2] == null)
                                    el[el2] = []
                                else {
                                    el[el2] = [...el[el2].split(';')]
                                }
                            }
                        if (table == 'objects')
                            if (new Set([2, 8]).has(i)) {
                                if (el[el2] == null)
                                    el[el2] = []
                                else {
                                    el[el2] = [...el[el2].split(';')]
                                }
                            }
                        if (table == 'contacts')
                            if (new Set([10, 12]).has(i)) {
                                if (el[el2] == null)
                                    el[el2] = []
                                else {
                                    el[el2] = [...el[el2].split(';')]
                                }
                            }
                    })
                    resolve(changedAr)
                })
            })
        })
    }).then((changedAr) => {
        return new Promise((resolve, reject) => {
            console.log('area')
            if (table == 'companies') {
                pool.query(`
                SELECT SUM(area), company FROM objects group by company
            `, (error, results2) => {
                    let sums = results2.rows
                    changedAr.forEach((el) => {
                        let findd = sums.find((el2) => {
                            return el2.company == el.name
                        })
                        if (findd)
                            el.area = findd.sum
                        else el.area = ''
                    })
                    if (error) {
                        reject(error)
                    }
                    resolve(changedAr);
                })
            } else {
                resolve(changedAr);
            }
        })
    }).then((changedAr) => {
        return new Promise((resolve, reject) => {
            console.log('money')
            if (table == 'companies') {
                pool.query(`
                SELECT SUM(money), company FROM yur group by company
            `, (error, results30) => {
                    let moneys = results30.rows
                    changedAr.forEach((el) => {
                        let findd = moneys.find((el2) => {
                            return el2.company == el.name
                        })
                        if (findd)
                            el.money = findd.sum
                        else el.money = ''
                    })
                    if (error) {
                        reject(error)
                    }
                    let numOfNotEmpty = 0
                    changedAr.forEach((el) => {
                        if (el.name) numOfNotEmpty += 1
                    })
                    resolve([changedAr, reloadOrNot, numOfNotEmpty])
                })
            } else {
                let numOfNotEmpty = 0
                changedAr.forEach((el) => {
                    if (el.name) numOfNotEmpty += 1
                })
                resolve([changedAr, reloadOrNot, numOfNotEmpty])
            }
        })
    })
}

const createCompanyTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        CREATE TABLE companies
(
    id smallserial PRIMARY KEY,
    name text unique default NULL,
    description text default NULL,
    industry text default NULL,
    website text default NULL,
    phone text default NULL,
    email text default NULL,
    situation text default NULL,
    link text default NULL,
    data date default CURRENT_DATE,
    who text default NULL,
    status text default NULL,
    idsort text default NULL
);
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 1 создана'));
        })
    })
}

const createObjectTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        CREATE TABLE objects
(
    id smallserial PRIMARY KEY,
    name text unique default NULL,
    segment text default NULL,
    city text default NULL,
    description text default NULL,
    area numeric default NULL,
    who_now text default NULL,
    company text REFERENCES companies (name) default NULL,
    link text default NULL,
    data date default CURRENT_DATE,
    who text default NULL,
    status text default NULL,
    idsort text default NULL
);
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 2 создана'));
        })
    })
}

const createContactsTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        CREATE TABLE contacts
(
    id smallserial PRIMARY KEY,
    name text unique default NULL,
    post text default NULL,
    role text default NULL,
    status2 text default NULL,
    begin text default NULL,
    endd text default NULL,
    social_network text default NULL,
    email text default NULL,
    phone text default NULL,
    public text default NULL,
    data_public text default NULL,
    link text default NULL,
    company text REFERENCES companies (name) default NULL,
    object text REFERENCES objects (name) default NULL,
    data date default CURRENT_DATE,
    who text default NULL,
    status text default NULL,
    idsort text default NULL
);
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 3 создана'));
        })
    })
}

const createYurTable = () => {
    return new Promise(function (resolve, reject) {
        pool.query(`
        CREATE TABLE yur
(
    id smallserial PRIMARY KEY,
    name text unique default NULL,
    inn text default NULL,
    director text default NULL,
    money numeric default NULL,
    company text REFERENCES companies (name) default NULL,
    data date default CURRENT_DATE,
    who text default NULL,
    status text default NULL,
    idsort text default NULL
);

        `, (error, results) => {
            if (error) {
                reject(error)
            }
            resolve(console.log('Таблица 4 создана'));
        })
    })
}

const fillingCompanyTable = () => {
    return new Promise(function (resolve, reject) {
        let k = 0;
        for (let i = 0; i < 60; i++) {
            pool.query(`
        INSERT INTO companies (name, description, industry, website, phone, email, situation, link, who, status, idsort) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
        `, (error, results) => {
                k += 1;
                if (k == 60) resolve(console.log('Заполнена таблица 1'))
            })
        }
    })
}

const fillingObjectTable = () => {
    return new Promise(function (resolve, reject) {
        let k = 0;
        for (let i = 0; i < 60; i++) {
            pool.query(`
        insert into objects (name, segment, city, description, area, who_now, company, link, who, status, idsort) values (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
        `, (error, results) => {
                k += 1;
                if (k == 60) resolve(console.log('Заполнена таблица 2'))
            })
        }
    })
}

const fillingContactTable = () => {
    return new Promise(function (resolve, reject) {
        let k = 0;
        for (let i = 0; i < 60; i++) {
            pool.query(`
        INSERT INTO contacts (name, post, role, status2, begin, endd, social_network, email, phone, public, data_public, link, company, object, who, status, idsort) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
        `, (error, results) => {
                k += 1;
                if (k == 60) resolve(console.log('Заполнена таблица 3'))
            })
        }
    })
}

const fillingYurTable = () => {
    return new Promise(function (resolve, reject) {
        let k = 0;
        for (let i = 0; i < 60; i++) {
            pool.query(`
        INSERT INTO yur (name, inn, director, money, company, who, status, idsort) VALUES (NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
        `, (error, results) => {
                k += 1;
                if (k == 60) resolve(console.log('Заполнена таблица 4'))
            })
        }
    })
}

const getCompanyByName = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from companies where name = '${name}'
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([3, 4, 5, 6, 7, 8]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            pool.query(`
                SELECT SUM(area), company FROM objects group by company
            `, (error, results2) => {
                let sums = results2.rows
                changedAr.forEach((el) => {
                    let findd = sums.find((el2) => {
                        return el2.company == el.name
                    })
                    if (findd)
                        el.area = findd.sum
                    else el.area = ''
                })
                pool.query(`
                SELECT SUM(money), company FROM yur group by company
            `, (error, results30) => {
                    let moneys = results30.rows
                    changedAr.forEach((el) => {
                        let findd = moneys.find((el2) => {
                            return el2.company == el.name
                        })
                        if (findd)
                            el.money = findd.sum
                        else el.money = ''
                    })
                    resolve(changedAr[0])
                })
            })
        })
    })
}

const getObjectsByCompany = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from objects where company = '${name}' order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([2, 8]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            resolve(changedAr)
        })
    })
}

const getContactsByCompany = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from contacts where company = '${name}' order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([10, 12]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            resolve(changedAr)
        })
    })
}

const getYursByCompany = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from yur where company = '${name}' order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            resolve(changedAr)
        })
    })
}

const getObjectByName = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from objects where name = '${name}'
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([2, 8]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            resolve(changedAr[0])
        })
    })
}

const getContactsByObject = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from contacts where object = '${name}' order by idsort
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([10, 12]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            resolve(changedAr)
        })
    })
}

const getContactByName = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from contacts where name = '${name}'
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            changedAr.forEach((el) => {
                Object.keys(el).map((el2, i) => {
                    if (new Set([10, 12]).has(i)) {
                        if (el[el2] == null)
                            el[el2] = []
                        else {
                            el[el2] = [...el[el2].split(';')]
                        }
                    }
                })
            })
            resolve(changedAr[0])
        })
    })
}

const getYurByName = (req) => {
    let {name} = req.body
    console.log(name)
    return new Promise(function (resolve, reject) {
        pool.query(`
        select * from yur where name = '${name}'
        `, (error, results) => {
            if (error) {
                reject(error)
            }
            let changedAr = results.rows
            changedAr.forEach((el) => {
                delete el.idsort
            })
            resolve(changedAr[0])
        })
    })
}

module.exports = {
    getCompanies,
    getObjects,
    getContacts,
    getYur,
    getCompanyNames,
    getObjectNames,
    getCompanyByName,
    getObjectsByCompany,
    getContactsByCompany,
    getYursByCompany,
    getObjectByName,
    getContactsByObject,
    getContactByName,
    getYurByName,
    createCompanyTable,
    createObjectTable,
    createContactsTable,
    createYurTable,
    fillingCompanyTable,
    fillingObjectTable,
    fillingContactTable,
    fillingYurTable,
    editRecord
}