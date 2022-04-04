import {useEffect, useRef, useState} from "react";
import backImg from '../images/back.svg'
import Cell from "./Cell";

function OneObject({obj, visible, back, numOfObject, goCont, goComp}) {

    let [object, setObject] = useState({})
    const [company, setCompany] = useState({})
    let [contacts, setContacts] = useState([])

    useEffect(() => {
            if (visible == 1) {
                fetch('http://localhost:3001/getObjectByName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: obj.name})
                }).then(el => {
                    console.log(el)
                    return el.text()
                }).then((el) => {
                    let res = JSON.parse(el)
                    console.log(res)
                    setObject(res)
                }).then(() => {
                    return fetch('http://localhost:3001/getCompanyByName', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({name: obj.company})
                    })
                }).then(el => {
                    console.log(el)
                    return el.text()
                }).then((el) => {
                    let res = JSON.parse(el)
                    console.log(res)
                    setCompany(res)
                }).then(() => {
                    return fetch('http://localhost:3001/getContactsByObject', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({name: obj.name})
                    })
                }).then(el => {
                    console.log(el)
                    return el.text()
                }).then((el) => {
                    let res = JSON.parse(el)
                    console.log(res)
                    setContacts(res)
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
            return fetch('http://localhost:3001/getObjectByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: obj.name})
            })
        }).then(el => {
            console.log(el)
            return el.text()
        }).then((el) => {
            let res = JSON.parse(el)
            console.log(res)
            setObject(res)
        }).then(() => {
            return fetch('http://localhost:3001/getCompanyByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: obj.company})
            })
        }).then(el => {
            console.log(el)
            return el.text()
        }).then((el) => {
            let res = JSON.parse(el)
            console.log(res)
            setCompany(res)
        }).then(() => {
            return fetch('http://localhost:3001/getContactsByObject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: obj.name})
            })
        }).then(el => {
            console.log(el)
            return el.text()
        }).then((el) => {
            let res = JSON.parse(el)
            console.log(res)
            setContacts(res)
        })
    }

    return (
        <div className="wrap_company_form"
             style={visible ? {display: 'block', position: 'relative'} : {display: 'none', position: 'relative'}}>
            {company.name ?
                <>
                    <div style={{fontSize: '50px'}}>
                        {object.name}
                    </div>
                    <div className="firstLineCompanyForm objectForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Сегмент</span>
                        <Cell defaul={object.segment} id={object.id} name_table="obj"
                              select={'seg'}
                              key={object.name ? ("obj" + object.id + 'objectForm' + 'segment') : 'null'}
                              num={2}
                              type={'s'} i={numOfObject} j={'segment'} setCell={setCell}
                              info={object.segment ? object.segment : ['Добавить']}></Cell>
                        <span className="form_desc">Город</span>
                        <Cell defaul={object.city} id={object.id} name_table="obj"
                              select={''}
                              key={object.name ? ("obj" + object.id + 'objectForm' + 'city') : 'null'}
                              type={'t'} i={numOfObject} j={'city'} setCell={setCell}
                              info={company.city ? (company.city) : ''}></Cell>
                        <span className="form_desc">Площадь, кв.м.</span>
                        <Cell defaul={object.area} id={object.id} name_table="obj"
                              select={''}
                              key={object.name ? ("obj" + object.id + 'objectForm' + 'area') : 'null'}
                              type={'t'} i={numOfObject} j={'area'} setCell={setCell}
                              info={object.area ? object.area : ''}></Cell>
                        <span className="form_desc">Кто обслуживает объект сейчас</span>
                        <Cell defaul={object.who_now} id={object.id} name_table="obj"
                              select={''}
                              key={object.name ? ("obj" + object.id + 'objectForm' + 'who_now') : 'null'}
                              type={'t'} i={numOfObject} j={'who_now'} setCell={setCell}
                              info={object.who_now ? object.who_now : ''}></Cell>
                    </div>
                    <div className="thirdLineCompanyForm objectForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Статус проверки</span>
                        <Cell defaul={object.status} id={object.id} name_table="obj"
                              select={'sta'}
                              num={11}
                              key={object.name ? ("obj" + object.id + 'objectForm' + 'status') : 'null'}
                              type={'s'} i={numOfObject} j={'status'} setCell={setCell}
                              info={object.status ? object.status : ''}></Cell>
                        <span className="form_desc">Источники информации</span>
                        <Cell defaul={object.link} id={object.id} name_table="obj"
                              select={'r'}
                              num={8}
                              key={object.name ? ("obj" + object.id + 'objectForm' + 'link') : 'null'}
                              type={'s'} i={numOfObject} j={'link'} setCell={setCell}
                              info={object.link ? object.link : ''}></Cell>
                        <span className="form_desc">Дата добавления</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={object.data ? object.data : ''}/>
                        <span className="form_desc">Кто добавил</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={object.who ? object.who : ''}/>
                    </div>
                    <div className="thirdLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Компания</span>
                        <div className="nameInForm" style={{fontSize: '20px', cursor: 'pointer'}}
                             onClick={() => goComp(company, 0)}>{company.name}</div>
                        <span className="form_desc">Ситуация в бизнесе</span>
                        <Cell defaul={company.situation} id={company.id} name_table="comp"
                              select={'sit'}
                              num={7}
                              key={company.name ? ("comp" + company.id + 'objectForm' + 'situation') : 'null'}
                              type={'s'} i={numOfObject} j={'situation'} setCell={setCell}
                              info={company.situation ? company.situation : ''}></Cell>
                        <span className="form_desc">Сайт/соцсеть</span>
                        <Cell defaul={company.website} id={company.id} name_table="comp"
                              select={'r'}
                              num={4}
                              key={company.name ? ("comp" + company.id + 'objectForm' + 'website') : 'null'}
                              type={'s'} i={numOfObject} j={'website'} setCell={setCell}
                              info={company.website ? company.website : ''}></Cell>
                        <span className="form_desc">Почта/телеграм</span>
                        <Cell defaul={company.email} id={company.id} name_table="comp"
                              select={'r'}
                              num={6}
                              key={company.name ? ("comp" + company.id + 'objectForm' + 'email') : 'null'}
                              type={'s'} i={numOfObject} j={'email'} setCell={setCell}
                              info={company.email ? company.email : ''}></Cell>
                        <span className="form_desc">Телефон</span>
                        <Cell defaul={company.phone} id={company.id} name_table="comp"
                              select={'r'}
                              num={5}
                              key={company.name ? ("comp" + company.id + 'objectForm' + 'phone') : 'null'}
                              type={'s'} i={numOfObject} j={'phone'} setCell={setCell}
                              info={company.phone ? company.phone : ''}></Cell>
                    </div>
                    <div className="companyFormHeader">Контакты</div>
                    <div className="thirdLineCompanyForm contactForm" style={{display: 'flex', flexDirection: 'column'}}>
                        {
                            contacts.map((el, i) => (
                                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                    <span className="form_desc">ФИО</span>
                                    <div className="nameInForm" style={{fontSize: '20px', cursor: 'pointer'}}
                                         onClick={() => goCont(el, i)}>{el.name}</div>
                                    <span className="form_desc">Должность/функционал</span>
                                    <Cell defaul={el.post} id={el.id} name_table="cont"
                                          select={''}
                                          key={"cont" + el.id + 'objectForm' + 'post'}
                                          type={'t'} i={numOfObject} j={'post'} setCell={setCell}
                                          info={el.post ? (el.post) : ''}></Cell>
                                    <span className="form_desc">Предполагаемая роль в процессе покупки</span>
                                    <Cell defaul={el.role} id={el.id} name_table="cont"
                                          select={'rol'}
                                          key={"cont" + el.id + 'objectForm' + 'role'}
                                          type={'s'} i={numOfObject} j={'role'} setCell={setCell}
                                          info={el.role ? el.role : ''}></Cell>
                                    <span className="form_desc">Статус</span>
                                    <Cell defaul={el.status} id={el.id} name_table="cont"
                                          select={'sta'}
                                          key={"cont" + el.id + 'objectForm' + 'status'}
                                          type={'s'} i={numOfObject} j={'status'} setCell={setCell}
                                          info={el.status ? el.status : ''}></Cell>
                                    <span className="form_desc">Соцсеть</span>
                                    <Cell defaul={el.social_network} id={el.id} name_table="cont"
                                          select={''}
                                          key={"cont" + el.id + 'objectForm' + 'social_network'}
                                          type={'t'} i={numOfObject} j={'social_network'} setCell={setCell}
                                          info={el.social_network ? el.social_network : ''}></Cell>
                                    <span className="form_desc">Почта/телеграм</span>
                                    <Cell defaul={el.email} id={el.id} name_table="cont"
                                          select={''}
                                          key={"cont" + el.id + 'objectForm' + 'email'}
                                          type={'t'} i={numOfObject} j={'email'} setCell={setCell}
                                          info={el.email ? el.email : ''}></Cell>
                                    <span className="form_desc">Телефон</span>
                                    <Cell defaul={el.phone} id={el.id} name_table="cont"
                                          select={''}
                                          key={"cont" + el.id + 'objectForm' + 'phone'}
                                          type={'t'} i={numOfObject} j={'phone'} setCell={setCell}
                                          info={el.phone ? el.phone : ''}></Cell>
                                    <span className="form_desc">Публикации</span>
                                    <div>{el.public.length == 0 ? 'Нет' : 'Да'}</div>
                                </div>))
                        }
                    </div>
                    <div className="backImg" onClick={back}>
                        <img style={{width: '100%', height: '100%'}} src={backImg} alt=""/>
                    </div>
                </>
                : null}
        </div>
    );
}

export default OneObject;