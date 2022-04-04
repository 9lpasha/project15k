import {useEffect, useRef, useState} from "react";
import backImg from '../images/back.svg'
import Cell from "./Cell";

function OneYur({yur, visible, back, numOfCompany, goComp}) {

    let [Yur, setYur] = useState({})
    const [company, setCompany] = useState({})

    useEffect(() => {
            if (visible == 1) {
                fetch('http://localhost:3001/getYurByName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: yur.name})
                }).then(el => {
                    console.log(el)
                    return el.text()
                }).then((el) => {
                    let res = JSON.parse(el)
                    console.log(res)
                    setYur(res)
                }).then(() => {
                    return fetch('http://localhost:3001/getCompanyByName', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({name: yur.company})
                    })
                }).then(el => {
                    console.log(el)
                    return el.text()
                }).then((el) => {
                    let res = JSON.parse(el)
                    console.log(res)
                    setCompany(res)
                })
            }
        }
        ,
        [visible]
    )

    let setCell = (value, i, field, num, table) => {
        console.log(JSON.stringify({value, id: i, field, num}))
        fetch('http://localhost:3001/editRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({value, id: i, field, table, num})
        }).then(() => {
            return fetch('http://localhost:3001/getYurByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: yur.name})
            })
        }).then(el => {
            console.log(el)
            return el.text()
        }).then((el) => {
            let res = JSON.parse(el)
            console.log(res)
            setYur(res)
        }).then(() => {
            return fetch('http://localhost:3001/getCompanyByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: yur.company})
            })
        }).then(el => {
            console.log(el)
            return el.text()
        }).then((el) => {
            let res = JSON.parse(el)
            console.log(res)
            setCompany(res)
        })
    }

    return (
        <div className="wrap_company_form"
             style={visible ? {display: 'block', position: 'relative'} : {display: 'none', position: 'relative'}}>
            {company.name ?
                <>
                    <div style={{fontSize: '50px'}}>
                        {Yur.name}
                    </div>
                    <div className="thirdLineCompanyForm yurForm"
                         style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                        <span className="form_desc">ИНН</span>
                        <Cell defaul={Yur.inn} id={Yur.id} name_table="yur"
                              select={''}
                              key={"yur" + Yur.id + 'YurForm' + 'inn'}
                              type={'t'} i={numOfCompany} j={'inn'} setCell={setCell}
                              info={Yur.inn ? Yur.inn : ''}></Cell>
                        <span className="form_desc">Гендиректор</span>
                        <Cell defaul={Yur.director} id={Yur.id} name_table="yur"
                              select={''}
                              key={"yur" + Yur.id + 'YurForm' + 'director'}
                              type={'t'} i={numOfCompany} j={'director'} setCell={setCell}
                              info={Yur.director ? Yur.director : ''}></Cell>
                        <span className="form_desc">Выручка, млн.руб</span>
                        <Cell defaul={Yur.money} id={Yur.id} name_table="yur"
                              select={''}
                              key={"yur" + Yur.id + 'YurForm' + 'money'}
                              type={'t'} i={numOfCompany} j={'money'} setCell={setCell}
                              info={Yur.money ? Yur.money : ''}></Cell>
                        <span className="form_desc">Дата добавления</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={Yur.data ? Yur.data : ''}/>
                        <span className="form_desc">Кто добавил</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={Yur.who ? Yur.who : ''}/>
                    </div>
                    <div className="thirdLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Компания</span>
                        <div className="nameInForm" style={{fontSize: '20px', cursor: 'pointer'}}
                             onClick={() => goComp(company, 0)}>{company.name}</div>
                        <span className="form_desc">Ситуация в бизнесе</span>
                        <Cell defaul={company.situation} id={company.id} name_table="comp"
                              select={'sit'}
                              num={7}
                              key={company.name ? ("comp" + company.id + 'yurForm' + 'situation') : 'null'}
                              type={'s'} i={numOfCompany} j={'situation'} setCell={setCell}
                              info={company.situation ? company.situation : ''}></Cell>
                        <span className="form_desc">Сайт/соцсеть</span>
                        <Cell defaul={company.website} id={company.id} name_table="comp"
                              select={'r'}
                              num={4}
                              key={company.name ? ("comp" + company.id + 'yurForm' + 'website') : 'null'}
                              type={'s'} i={numOfCompany} j={'website'} setCell={setCell}
                              info={company.website ? company.website : ''}></Cell>
                        <span className="form_desc">Почта/телеграм</span>
                        <Cell defaul={company.email} id={company.id} name_table="comp"
                              select={'r'}
                              num={6}
                              key={company.name ? ("comp" + company.id + 'yurForm' + 'email') : 'null'}
                              type={'s'} i={numOfCompany} j={'email'} setCell={setCell}
                              info={company.email ? company.email : ''}></Cell>
                        <span className="form_desc">Телефон</span>
                        <Cell defaul={company.phone} id={company.id} name_table="comp"
                              select={'r'}
                              num={5}
                              key={company.name ? ("comp" + company.id + 'yurForm' + 'phone') : 'null'}
                              type={'s'} i={numOfCompany} j={'phone'} setCell={setCell}
                              info={company.phone ? company.phone : ''}></Cell>
                    </div>
                    <div className="backImg" onClick={back}>
                        <img style={{width: '100%', height: '100%'}} src={backImg} alt=""/>
                    </div>
                </>
                : null}
        </div>
    );
}

export default OneYur;