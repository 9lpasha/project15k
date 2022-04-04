import {useEffect, useRef, useState} from "react";
import Cell from "./Cell";
import {observer} from "../index";


function CompanyTable({}) {

    let types = [['t'], ['t'], ['t'], ['s', 'ind'], ['s', 'r'], ['s', 'r'], ['s', 'r'], ['s', 'r'], ['s', 'sit'], ['t'], ['t'], ['s', 'sta'], ['t'], ['t']]

    const [companies, setCompanies] = useState([])
    const [notEmpty, setNotEmpty] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3001/getCompanies')
            .then(el => {
                console.log(el)
                return el.text()
            })
            .then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setCompanies(res[0])
                setNotEmpty(res[1])
            })
    }, [])

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

    let calsses = ["th_comp_name", "th_comp_desc", "th_comp_ind", "th_comp_website", "th_comp_phone", "th_comp_email",
        "th_comp_sit", "th_comp_link", "th_comp_data", "th_comp_who", "th_comp_status", "th_comp_area", "th_comp_money"]

    return (
        <div>
            <div className="tableWrap">
                <table className="Table">
                    <tr className="Header HeaderComp">
                        <th>№</th>
                        <th>Компания</th>
                        <th>Описание компании</th>
                        <th>Направление деятельности компании</th>
                        <th>Сайт/cоцсеть</th>
                        <th>Телефон</th>
                        <th>Почта/телеграм</th>
                        <th>Ситуация в бизнесе</th>
                        <th>Ссылка на источники информации</th>
                        <th>Дата добавления</th>
                        <th>Кто добавил</th>
                        <th>Статус проверки</th>
                        <th>Площади объектов</th>
                        <th>Выручка юрлиц за 2021 год, млн.руб</th>
                    </tr>
                    {companies.map((el, i) => (
                        <tr key={i + 'tr' + 'comp'}>
                            <td className="th_num" style={{position: 'relative'}} key={i + 'f' + 0 + 's' + 'comp'}>
                                <Cell defaul={1} key={i + '-' + 0 + 'comp'}
                                      id={el['id']}
                                      name_table="comp"
                                      select={''}
                                      type={'t'} i={i} j='idsort' num={0} setCell={setCell}
                                      info={i + 1}> </Cell>
                            </td>
                            {Object.keys(el).slice(1).map((el2, j) => (
                                <td className={calsses[j]} style={{position: 'relative'}} key={i + 'f' + j + 1 + 's' + 'comp'}>
                                    <Cell defaul={el[el2]} key={i + '-' + j + 1 + 'comp'}
                                          id={el['id']}
                                          kolvo={notEmpty}
                                          name_table="comp"
                                          select={types[j + 1][0] == 's' ? types[j + 1][1] : ''}
                                          type={types[j + 1][0]} i={i} j={el2} num={j + 1} setCell={setCell}
                                          info={
                                              /*el ?*/
                                              (el[el2] ?
                                                  (Array.isArray(el[el2]) ?
                                                      (el[el2].length > 0 ?
                                                          [...el[el2], 'Добавить'] : [...el[el2], '', 'Добавить']) : ((el2 == 'data' || el2 == 'area' || el2 == 'money') ? [el[el2], el['name']] : el[el2])) : '') //: ''
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

export default CompanyTable;