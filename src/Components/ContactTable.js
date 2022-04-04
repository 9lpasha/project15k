import {useEffect, useRef, useState} from "react";
import Cell from "./Cell";
import {observer} from "../index";

function ContactTable({}) {

    let types = [['t'], ['t'], ['t'], ['s', 'rol'], ['s', 'sta2'], ['t'], ['t'], ['t'], ['t'], ['t'], ['s', 'r'], ['t'], ['s', 'r'], ['s', 'com'], ['s', 'obj'], ['t'], ['t'], ['s', 'sta']]

    const [companies, setCompanies] = useState([])
    const [companyNames, setCompanyNames] = useState([])
    const [objectNames, setObjectNames] = useState([])
    const [notEmpty, setNotEmpty] = useState(0)

    useEffect(() => {
            fetch('http://localhost:3001/getCompanyNames').then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                setCompanyNames(JSON.parse(el).map((el) => (el.name)))
            }).then(() => {
                return fetch('http://localhost:3001/getObjectNames')
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                setObjectNames(JSON.parse(el).map((el) => (el.name)))
            }).then(() => {
                return fetch('http://localhost:3001/getContacts')
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setCompanies(res[0])
                setNotEmpty(res[1])
            })
        }, []
    )

    let setCell = (value, i, field, num, table) => {
        console.log(JSON.stringify({value, id: i, field, num}))
        fetch('http://localhost:3001/editRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({value, id: i, field, table, num})
        })
            .then(el => {
                return el.text()
            })
            .then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setCompanies(res[0])
                setNotEmpty(res[2])
                observer()
                if (res[1])
                    window.location.reload()
            })
    }

    return (
        <div>
            <div className="tableWrap">
                <table className="Table">
                    <tr className="Header HeaderCont">
                        <th>№</th>
                        <th>ФИО</th>
                        <th>Должность/Функционал</th>
                        <th>Предполагаемая роль в процессе покупки</th>
                        <th>Статус</th>
                        <th>Начало работы</th>
                        <th>Завершение работы</th>
                        <th>Соцсеть</th>
                        <th>Почта/телеграм</th>
                        <th>Телефон</th>
                        <th>Публикации</th>
                        <th>Дата крайней публикации</th>
                        <th>Источник контакта</th>
                        <th>Компания</th>
                        <th>Объект</th>
                        <th>Дата добавления</th>
                        <th>Кто добавил</th>
                        <th>Статус проверки</th>
                    </tr>
                    {companies.map((el, i) => (
                        <tr key={i + 'tr' + 'obj'}>
                            <td className="th_num" style={{position: 'relative'}} key={i + 'f' + 0 + 's' + 'comp'}>
                                <Cell defaul={1} key={i + '-' + 0 + 'comp'}
                                      id={el['id']}
                                      name_table="comp"
                                      select={''}
                                      type={'t'} i={i} j='idsort' num={0} setCell={setCell}
                                      info={i + 1}> </Cell>
                            </td>
                            {Object.keys(el).slice(1).map((el2, j) => (
                                <td style={{position: 'relative'}} key={i + 'f' + j + 1 + 's' + 'obj'}>
                                    <Cell defaul={el[el2]} key={i + '-' + j + 1 + 'obj'}
                                          id={el['id']}
                                          name_table="cont"
                                          kolvo={notEmpty}
                                          companyNames={companyNames}
                                          objectNames={objectNames}
                                          select={types[j + 1][0] == 's' ? types[j + 1][1] : ''}
                                          type={types[j + 1][0]} i={i} j={el2} num={j + 1} setCell={setCell}
                                          info={
                                              /*el ?*/
                                              (el[el2] ?
                                                  (Array.isArray(el[el2]) ?
                                                      (el[el2].length > 0 ?
                                                          [...el[el2], 'Добавить'] : [...el[el2], '', 'Добавить']) : (el2 == 'data' ? [el[el2], el['name']] : el[el2])) : '') //: ''
                                          }> </Cell>
                                </td>))}
                        </tr>
                    ))}
                </table>
            </div>
            : null}
        </div>
    );
}

export default ContactTable;