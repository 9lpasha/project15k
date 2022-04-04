import {useEffect, useRef, useState} from "react";
import Cell from "./Cell";
import del from "../images/x.png";

function Companies() {

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

    let imgRef = useRef()
    let modal = useRef()
    let input1 = useRef()
    let input2 = useRef()
    let input3 = useRef()
    let input4 = useRef()
    let input42 = useRef()
    let input5 = useRef()
    let input52 = useRef()
    let input6 = useRef()
    let input62 = useRef()
    let input7 = useRef()
    let input8 = useRef()
    let input9 = useRef()
    let input10 = useRef()
    let input11 = useRef()

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

    let deleteString = (id, alias) => {
        fetch('http://localhost:3001/deleteRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id, alias})
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

    let insertString = (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11) => {
        fetch('http://localhost:3001/insertRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11})
        })
            .then(el => {
                console.log(el)
                return el.text()
            })
            .then((el) => {
                console.log(el)
                setMerchants((JSON.parse(el)))
                setDefaul((JSON.parse(el)).map((el) => [el.id, el.alias]))
                modal.current.style.display = 'none'
                input1.current.value = ''
                input2.current.value = ''
                input3.current.value = ''
                input4.current.value = ''
                input5.current.value = ''
                input6.current.value = ''
                input7.current.value = ''
                input8.current.value = ''
                input9.current.value = ''
                input10.current.value = ''
                input11.current.value = ''
            })
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
                        {merchants.map((el, i) => (<tr key={i}>
                            <Cell defaul={defaul[i][0]} key={i + 'q'} setCellLocal={setCellLocal} num={i}
                                  type="number"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i + 1}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'w'} setCellLocal={setCellLocal} num={i}
                                  type="text" alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={el.id}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'e'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'name'} i={el.id} setCell={setCell} info={el.name}></Cell>
                            <Cell defaul={defaul[i][1]} key={i + 'r'} setCellLocal={setCellLocal} num={i}
                                  type="select"
                                  select='ind'
                                  alias={el.alias}
                                  field={'alias'} i={el.id} setCell={setCell}
                                  info={['Добавить', 'eqweq - прол', 'eqweqw - мпмиор']}></Cell>
                            <Cell defaul={defaul[i][1]} key={i + 't'} setCellLocal={setCellLocal} num={i}
                                  type="select"
                                  select='site'
                                  alias={el.alias}
                                  field={'textinfo'} i={el.id} setCell={setCell}
                                  info={['www.youtube.com - ютуб', 'vk.ru - вк']}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'y'} setCellLocal={setCellLocal} num={i}
                                  type="select"
                                  select='phone'
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={[89046685031]}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'u'} setCellLocal={setCellLocal} num={i}
                                  type="select"
                                  select='mail'
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={['131313pasha@mail.ru']}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'i'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'o'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'p'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'a'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 's'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'd'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <Cell defaul={defaul[i][0]} key={i + 'f'} setCellLocal={setCellLocal} num={i}
                                  type="text"
                                  alias={el.alias}
                                  field={'id'} i={el.id} setCell={setCell} info={i}></Cell>
                            <div ref={imgRef}
                                 onMouseLeave={() => document.querySelectorAll('tr')[i + 1].style.background = 'white'}
                                 onMouseEnter={() => document.querySelectorAll('tr')[i + 1].style.background = '#e7e8e6'}
                                 onClick={() => deleteString(el.id, el.alias)}>
                                <img src={del} alt=""/>
                            </div>
                        </tr>))}
                    </table>
                </div>
                : ''}
            <div onClick={() => {
                modal.current.style.display = 'flex'
            }} className="addString">Добавить запись
            </div>
            <div ref={modal} className="backModal">
                <div className="modalInsertString">
                    <div>
                        <span>Компания</span>
                        <input ref={input1} type="text"/>
                    </div>
                    <div>
                        <span>Описание компании</span>
                        <input ref={input2} type="text"/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}} className="insertIndustries">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span>Направление деятельности компании</span>
                            <select ref={input3} type="text">
                                {industries.map((el) => <option value={el}>{el}</option>)}
                            </select>
                            <div onClick={() => {
                                if (input3.current.value != '')
                                    document.querySelector('.insertIndustries>p').textContent += (input3.current.value + ';')
                            }} className="butInsert">
                                Добавить
                            </div>
                        </div>
                        <p style={{color: 'gray'}}></p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}} className="insertSites">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span>Сайт/cоцсеть</span>
                            <input style={{margin: '0 10px'}} ref={input4} type="text"/> - Комментарий
                            <input style={{margin: '0 10px'}} ref={input42} type="text"/>
                            <div onClick={() => {
                                if (input4.current.value != '' && input42.current.value != '')
                                    document.querySelector('.insertSites>p').textContent += (input4.current.value + ' - ' + input42.current.value + ';')
                            }} className="butInsert">
                                Добавить
                            </div>
                        </div>
                        <p style={{color: 'gray'}}></p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}} className="insertPhones">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span>Телефон</span>
                            <input ref={input5} type="text"/> - Комментарий
                            <input style={{margin: '0 10px'}} ref={input52} type="text"/>
                            <div onClick={() => {
                                if (input5.current.value != '' && input52.current.value != '')
                                    document.querySelector('.insertPhones>p').textContent += (input5.current.value + ' - ' + input52.current.value + ';')
                            }} className="butInsert">
                                Добавить
                            </div>
                        </div>
                        <p style={{color: 'gray'}}></p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}} className="insertMails">
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <span>Почта/телеграм</span>
                            <input ref={input6} type="text"/> - Комментарий
                            <input style={{margin: '0 10px'}} ref={input62} type="text"/>
                            <div onClick={() => {
                                if (input6.current.value != '' && input62.current.value != '')
                                    document.querySelector('.insertMails>p').textContent += (input6.current.value + ' - ' + input62.current.value + ';')
                            }} className="butInsert">
                                Добавить
                            </div>
                        </div>
                        <p style={{color: 'gray'}}></p>
                    </div>
                    <div>
                        <span>Ситуация в бизнесе</span>
                        <select ref={input7} type="text">
                            {situation.map((el) => <option value={el}>{el}</option>)}
                        </select>
                    </div>
                    <div>
                        <span>Ссылка на источники информации</span>
                        <input ref={input8} type="text"/>
                    </div>
                    <div>
                        <span>Дата добавления</span>
                        <input ref={input9} type="text"/>
                    </div>
                    <div>
                        <span>Кто добавил</span>
                        <input ref={input10} type="text"/>
                    </div>
                    <div>
                        <span>Статус проверки</span>
                        <select ref={input11} type="text">
                            {status.map((el) => <option value={el}>{el}</option>)}
                        </select>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div
                            onClick={() => {
                                insertString(input1.current.value, input2.current.value, input3.current.value, input4.current.value, input5.current.value, input6.current.value, input7.current.value, input8.current.value, input9.current.value, input10.current.value, input11.current.value);
                                document.querySelectorAll('.modalInsertString p').forEach((el) => el.textContent = '')
                            }}
                            className="butInsert">Создать
                        </div>
                        <div onClick={() => {
                            modal.current.style.display = 'none'
                            input1.current.value = ''
                            input2.current.value = ''
                            input3.current.value = ''
                            input4.current.value = ''
                            input5.current.value = ''
                            input6.current.value = ''
                            input7.current.value = ''
                            input8.current.value = ''
                            input9.current.value = ''
                            input10.current.value = ''
                            input11.current.value = ''
                            document.querySelectorAll('.modalInsertString p').forEach((el) => el.textContent = '')
                        }} className="butInsert">Отменить
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Companies;