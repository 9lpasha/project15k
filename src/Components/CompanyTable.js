import {useEffect, useRef, useState} from "react";
import Cell from "./Cell";
import del from "../images/x.png";

function CompanyForm({}) {

    let industries = ['IT-компания',
        'Корпорация (от 50 млрд.руб выручка)',
        'Управляющая компания (недвижимость)',
        'Бизнес-центр',
        'Общественное пространство',
        'Производственная компания',
        'Машиностроение',
        'Электрокомпоненты',
        'Сборка']

    let situation = ['резкий рост',
        'медленный рост',
        'стагнация',
        'ухудшение',
        'тяжелый кризис',
        'приостановка работы']

    let status = ['готова к проверке',
        'доп.проверка',
        'согласовано']

    const [merchants, setMerchants] = useState([])
    let [defaul, setDefaul] = useState('')

    useEffect(() => {
        fetch('http://localhost:3001/')
            .then(el => {
                console.log(el)
                return el.text()
            })
            .then((el) => {
                setMerchants((JSON.parse(el)))
                let def = (JSON.parse(el)).map((el) => [el.id, el.alias])
                setDefaul(def)
                console.log(def)
            })
    }, [])

    useEffect(() => {
        console.log(merchants)
    }, [merchants])

    useEffect(() => {
        console.log(defaul)
    }, [])

    let setCellLocal = (i, field, value) => {
        let newMerch = merchants.slice()
        newMerch[i][field] = value
        setMerchants(newMerch)
    }

    let setCell = (value, i, field) => {
        console.log(JSON.stringify({value, id: i, field}))
        fetch('http://localhost:3001/editRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({value, id: i, field})
        })
            .then(el => {
                console.log(el)
                return el.text()
            })
            .then((el) => {
                console.log(el)
                setMerchants((JSON.parse(el)))
                setDefaul((JSON.parse(el)).map((el) => [el.id, el.alias]))
            })
    }

    let cells = []
    for(let ij = 0; ij < 100; ij++){
        cells[ij] = []
        for(let ij2 = 0; ij2 < 100; ij2++)
            cells[ij][ij2] = ''
    }

    return (
        <div>
            {defaul[merchants.length - 1] ?
                <div className="tableWrap">
                    <table className="Table">
                        <tr className="Header">
                            <th>№</th>
                            <th>Компания</th>
                            <th>Описание компании</th>
                            <th>Направление деятельности компании</th>
                            <th>Сайт/cоцсеть</th>
                            <th>Телефон</th>
                            <th>Почта/телеграм</th>
                            <th>Ситуация в бизнесе</th>
                            <th>Ссылка на источники информации</th>
                            <th>Выручка юрлиц за 2021 год, млн.руб</th>
                            <th>Площади объектов</th>
                            <th>Дата добавления</th>
                            <th>Кто добавил</th>
                            <th>Статус проверки</th>
                        </tr>
                        {cells.map((el) => (
                            <tr>
                                {el.map((el2) => (<td key={el + 'f' + el2 + 's'}></td>))}
                            </tr>
                        ))}
                    </table>
                </div>
                : ''}
        </div>
    );
}

export default CompanyForm;