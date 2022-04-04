import {useEffect, useRef, useState} from "react";
import backImg from '../images/back.svg'
import Cell from "./Cell";
import {observer} from "../index";

function OneCompany({comp, visible, back, numOfCompany, goYur, goCont, goObj}) {

    const [company, setCompany] = useState({})
    let [objects, setObjects] = useState([])
    let [contacts, setContacts] = useState([])
    let [yurs, setYurs] = useState([])

    useEffect(() => {
        if (visible == 1) {
            fetch('http://localhost:3001/getCompanyByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: comp.name})
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setCompany(res)
            }).then(() => {
                return fetch('http://localhost:3001/getObjectsByCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: comp.name})
                })
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setObjects(res)
            }).then(() => {
                return fetch('http://localhost:3001/getContactsByCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: comp.name})
                })
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setContacts(res)
            }).then(() => {
                return fetch('http://localhost:3001/getYursByCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: comp.name})
                })
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setYurs(res)
            })
        }
    }, [visible])

    let setCell = (value, i, field, num, table) => {
        console.log(JSON.stringify({value, id: i, field, num}))
        fetch('http://localhost:3001/editRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({value, id: i, field, table, num})
        }).then(el => {
            return fetch('http://localhost:3001/getCompanyByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: comp.name})
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setCompany(res)
            }).then(() => {
                return fetch('http://localhost:3001/getObjectsByCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: comp.name})
                })
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setObjects(res)
            }).then(() => {
                return fetch('http://localhost:3001/getContactsByCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: comp.name})
                })
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setContacts(res)
            }).then(() => {
                return fetch('http://localhost:3001/getYursByCompany', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: comp.name})
                })
            }).then(el => {
                console.log(el)
                return el.text()
            }).then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setYurs(res)
            })
        })
    }

    return (
        <div className="wrap_company_form"
             style={visible ? {display: 'block', position: 'relative'} : {display: 'none', position: 'relative'}}>
            {company.name ?
                <>
                    <div style={{fontSize: '50px'}}>
                        {company.name}
                    </div>
                    <div className="firstLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">№</span>
                        <input style={{width: '20px'}} disabled className="form_input" value={company.id}/>
                        <span className="form_desc">Статус</span>
                        <Cell defaul={company.status} id={company.id} name_table="comp"
                              select={'sta'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'status') : ''}
                              type={'s'} i={numOfCompany} j={'status'} setCell={setCell}
                              info={company.status ? company.status : ''}></Cell>
                        <span className="form_desc">Направление деятельности</span>
                        <Cell defaul={company.industry} id={company.id} name_table="comp"
                              select={'r'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'industry') : ''}
                              type={'s'} i={numOfCompany} j={'industry'} setCell={setCell}
                              info={company.industry ? ([...company.industry, 'Добавить']) : ''}></Cell>
                    </div>
                    <div className="secondLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Описание компании</span>
                        <Cell defaul={company.description} id={company.id} name_table="comp"
                              select={''}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'description') : ''}
                              type={'t'} i={numOfCompany} j={'description'} setCell={setCell}
                              info={company.description ? company.description : ''}></Cell>
                    </div>
                    <div className="thirdLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Сайт/соцсеть</span>
                        <Cell defaul={company.website} id={company.id} name_table="comp"
                              select={'r'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'website') : ''}
                              num={4}
                              type={'s'} i={numOfCompany} j={'website'} setCell={setCell}
                              info={company.website ? company.website : ''}></Cell>
                        <span className="form_desc">Ситуация в бизнесе</span>
                        <Cell defaul={company.situation} id={company.id} name_table="comp"
                              select={'sit'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'situation') : ''}
                              num={7}
                              type={'s'} i={numOfCompany} j={'situation'} setCell={setCell}
                              info={company.situation ? company.situation : ''}></Cell>
                    </div>
                    <div className="thirdLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Почта/Телеграм</span>
                        <Cell defaul={company.email} id={company.id} name_table="comp"
                              select={'r'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'email') : ''}
                              num={6}
                              type={'s'} i={numOfCompany} j={'email'} setCell={setCell}
                              info={company.email ? company.email : ''}></Cell>
                        <span className="form_desc">Телефон</span>
                        <Cell defaul={company.phone} id={company.id} name_table="comp"
                              select={'r'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'phone') : ''}
                              num={5}
                              type={'s'} i={numOfCompany} j={'phone'} setCell={setCell}
                              info={company.phone ? company.phone : ''}></Cell>
                    </div>
                    <div className="thirdLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Источники информации</span>
                        <Cell defaul={company.link} id={company.id} name_table="comp"
                              select={'r'}
                              key={company.name ? ("comp" + company.id + 'companyForm' + 'link') : ''}
                              num={8}
                              type={'s'} i={numOfCompany} j={'link'} setCell={setCell}
                              info={company.link ? company.link : ''}></Cell>
                        <span className="form_desc">Площадь объектов</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={company.area ? company.area : ''}/>
                        <span className="form_desc">Выручка в 2021, млн.р</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={company.money ? company.money : ''}/>
                    </div>
                    <div>
                        <div className="companyFormHeader">Объекты</div>
                        <div className="companyFormObjects objectForm"
                             style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                            {
                                objects.map((el, i) => (
                                    <div key={'objexts' + i} style={{display: 'flex', flexDirection: 'column'}}>
                                        <div style={{fontSize: '24px', cursor: 'pointer'}}
                                             onClick={() => goObj(el, i)}>{el.name}</div>
                                        <div style={{display: 'flex'}}>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Сегмент</span>
                                                <Cell defaul={el.segment} id={el.id} name_table="obj"
                                                      select={'seg'}
                                                      num={2}
                                                      key={"obj" + el.id + 'companyForm' + 'segment'}
                                                      type={'s'} i={numOfCompany} j={'segment'} setCell={setCell}
                                                      info={el.segment ? el.segment : ['Добавить']}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Город</span>
                                                <Cell defaul={el.city} id={el.id} name_table="obj"
                                                      select={''}
                                                      key={"obj" + el.id + 'companyForm' + 'city'}
                                                      type={'t'} i={numOfCompany} j={'city'} setCell={setCell}
                                                      info={el.city ? el.city : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Площадь</span>
                                                <Cell defaul={el.area} id={el.id} name_table="obj"
                                                      select={''}
                                                      key={"obj" + el.id + 'companyForm' + 'area'}
                                                      type={'t'} i={numOfCompany} j={'area'} setCell={setCell}
                                                      info={el.area ? el.area : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Кто сейчас обслуживает</span>
                                                <Cell defaul={el.who} id={el.id} name_table="obj"
                                                      select={''}
                                                      key={"obj" + el.id + 'companyForm' + 'who'}
                                                      type={'t'} i={numOfCompany} j={'who'} setCell={setCell}
                                                      info={el.who ? el.who : ''}></Cell>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="companyFormHeader">Контакты</div>
                        <div className="companyFormContacts contactForm"
                             style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                            {
                                contacts.map((el, i) => (
                                    <div key={'contacts' + i} style={{display: 'flex', flexDirection: 'column'}}>
                                        <div onClick={() => goCont(el, i)} style={{fontSize: '24px', cursor: 'pointer'}}>{el.name}</div>
                                        <div style={{display: 'flex'}}>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Должность/функционал</span>
                                                <Cell defaul={el.post} id={el.id} name_table="cont"
                                                      select={''}
                                                      num={2}
                                                      key={"cont" + el.id + 'companyForm' + 'post'}
                                                      type={'t'} i={numOfCompany} j={'post'} setCell={setCell}
                                                      info={el.post ? el.post : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span
                                                    className="form_desc">Предполагаемая роль в процессе покупки</span>
                                                <Cell defaul={el.role} id={el.id} name_table="cont"
                                                      select={'rol'}
                                                      key={"cont" + el.id + 'companyForm' + 'role'}
                                                      type={'s'} i={numOfCompany} j={'role'} setCell={setCell}
                                                      info={el.role ? el.role : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Статус</span>
                                                <Cell defaul={el.status2} id={el.id} name_table="cont"
                                                      select={'sta2'}
                                                      key={"cont" + el.id + 'companyForm' + 'status2'}
                                                      type={'s'} i={numOfCompany} j={'status2'} setCell={setCell}
                                                      info={el.status2 ? el.status2 : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Соц. сеть</span>
                                                <Cell defaul={el.social_network} id={el.id} name_table="cont"
                                                      select={''}
                                                      key={"cont" + el.id + 'companyForm' + 'social_network'}
                                                      type={'t'} i={numOfCompany} j={'social_network'} setCell={setCell}
                                                      info={el.social_network ? el.social_network : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Почта/телеграм</span>
                                                <Cell defaul={el.email} id={el.id} name_table="cont"
                                                      select={''}
                                                      key={"cont" + el.id + 'companyForm' + 'email'}
                                                      type={'t'} i={numOfCompany} j={'email'} setCell={setCell}
                                                      info={el.email ? el.email : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Телефон</span>
                                                <Cell defaul={el.phone} id={el.id} name_table="cont"
                                                      select={''}
                                                      key={"cont" + el.id + 'companyForm' + 'phone'}
                                                      type={'t'} i={numOfCompany} j={'phone'} setCell={setCell}
                                                      info={el.phone ? el.phone : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Публикации</span>
                                                <div>{el.public.length == 0 ? 'Нет' : 'Да'}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className="companyFormHeader">Юр. лица</div>
                        <div className="companyFormYurs yurForm"
                             style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                            {
                                yurs.map((el, i) => (
                                    <div key={'yurs' + i} style={{display: 'flex', flexDirection: 'column'}}>
                                        <div onClick={() => {goYur(el, i)}} style={{fontSize: '24px', cursor: 'pointer'}}>{el.name}</div>
                                        <div style={{display: 'flex'}}>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">ИНН</span>
                                                <Cell defaul={el.inn} id={el.id} name_table="yur"
                                                      select={''}
                                                      key={"yur" + el.id + 'companyForm' + 'inn'}
                                                      type={'t'} i={numOfCompany} j={'inn'} setCell={setCell}
                                                      info={el.inn ? el.inn : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Гендиректор</span>
                                                <Cell defaul={el.director} id={el.id} name_table="yur"
                                                      select={''}
                                                      key={"yur" + el.id + 'companyForm' + 'director'}
                                                      type={'t'} i={numOfCompany} j={'director'} setCell={setCell}
                                                      info={el.director ? el.director : ''}></Cell>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                                <span className="form_desc">Выручка, млн.руб</span>
                                                <Cell defaul={el.money} id={el.id} name_table="yur"
                                                      select={''}
                                                      key={"yur" + el.id + 'companyForm' + 'money'}
                                                      type={'t'} i={numOfCompany} j={'money'} setCell={setCell}
                                                      info={el.money ? el.money : ''}></Cell>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="backImg" onClick={back}>
                        <img style={{width: '100%', height: '100%'}} src={backImg} alt=""/>
                    </div>
                </> : null}
        </div>
    );
}

export default OneCompany;