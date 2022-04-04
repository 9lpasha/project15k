import {useEffect, useRef, useState} from "react";
import backImg from '../images/back.svg'
import Cell from "./Cell";

function OneContact({cont, visible, back, numOfObject, goComp}) {

    let [contact, setContact] = useState({})
    const [company, setCompany] = useState({})

    useEffect(() => {
            if (visible == 1) {
                fetch('http://localhost:3001/getContactByName', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({name: cont.name})
                }).then(el => {
                    console.log(el)
                    return el.text()
                }).then((el) => {
                    let res = JSON.parse(el)
                    console.log(res)
                    setContact(res)
                }).then(() => {
                    return fetch('http://localhost:3001/getCompanyByName', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({name: cont.company})
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
            return fetch('http://localhost:3001/getContactByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: cont.name})
            })
        }).then(el => {
            console.log(el)
            return el.text()
        }).then((el) => {
            let res = JSON.parse(el)
            console.log(res)
            setContact(res)
        }).then(() => {
            return fetch('http://localhost:3001/getCompanyByName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name: cont.company})
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
                        {contact.name}
                    </div>
                    <div className="firstLineCompanyForm contactForm"
                         style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Статус</span>
                        <Cell defaul={contact.status2} id={contact.id} name_table="cont"
                              select={'sta'}
                              key={contact.name ? ("obj" + contact.id + 'contactForm' + 'status2') : 'null'}
                              num={4}
                              type={'s'} i={numOfObject} j={'status2'} setCell={setCell}
                              info={contact.status2 ? contact.status2 : ['Добавить']}></Cell>
                        <span className="form_desc">Статус проверки</span>
                        <Cell defaul={contact.status} id={contact.id} name_table="cont"
                              select={''}
                              key={contact.name ? ("obj" + contact.id + 'contactForm' + 'status') : 'null'}
                              type={'t'} i={numOfObject} j={'status'} setCell={setCell}
                              info={contact.status ? (contact.status) : ''}></Cell>
                    </div>
                    <div className="thirdLineCompanyForm contactForm"
                         style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                        <span className="form_desc">Должность/функционал</span>
                        <Cell defaul={contact.post} id={contact.id} name_table="cont"
                              select={''}
                              key={"cont" + contact.id + 'contactForm' + 'post'}
                              type={'t'} i={numOfObject} j={'post'} setCell={setCell}
                              info={contact.post ? (contact.post) : ''}></Cell>
                        <span className="form_desc">Предполагаемая роль в процессе покупки</span>
                        <Cell defaul={contact.role} id={contact.id} name_table="cont"
                              select={'rol'}
                              key={"cont" + contact.id + 'contactForm' + 'role'}
                              type={'s'} i={numOfObject} j={'role'} setCell={setCell}
                              info={contact.role ? contact.role : ''}></Cell>
                        <span className="form_desc">Статус</span>
                        <Cell defaul={contact.status} id={contact.id} name_table="cont"
                              select={'sta'}
                              key={"cont" + contact.id + 'contactForm' + 'status'}
                              type={'s'} i={numOfObject} j={'status'} setCell={setCell}
                              info={contact.status ? contact.status : ''}></Cell>
                        <span className="form_desc">Соцсеть</span>
                        <Cell defaul={contact.social_network} id={contact.id} name_table="cont"
                              select={''}
                              key={"cont" + contact.id + 'contactForm' + 'social_network'}
                              type={'t'} i={numOfObject} j={'social_network'} setCell={setCell}
                              info={contact.social_network ? contact.social_network : ''}></Cell>
                        <span className="form_desc">Почта/телеграм</span>
                        <Cell defaul={contact.email} id={contact.id} name_table="cont"
                              select={''}
                              key={"cont" + contact.id + 'contactForm' + 'email'}
                              type={'t'} i={numOfObject} j={'email'} setCell={setCell}
                              info={contact.email ? contact.email : ''}></Cell>
                        <span className="form_desc">Телефон</span>
                        <Cell defaul={contact.phone} id={contact.id} name_table="cont"
                              select={''}
                              key={"cont" + contact.id + 'contactForm' + 'phone'}
                              type={'t'} i={numOfObject} j={'phone'} setCell={setCell}
                              info={contact.phone ? contact.phone : ''}></Cell>
                        <span className="form_desc">Начало работы</span>
                        <Cell defaul={contact.begin} id={contact.id} name_table="cont"
                              select={''}
                              key={"cont" + contact.id + 'contactForm' + 'begin'}
                              type={'t'} i={numOfObject} j={'begin'} setCell={setCell}
                              info={contact.begin ? contact.begin : ''}></Cell>
                        <span className="form_desc">Завершение работы</span>
                        <Cell defaul={contact.endd} id={contact.id} name_table="cont"
                              select={''}
                              key={"cont" + contact.id + 'contactForm' + 'endd'}
                              type={'t'} i={numOfObject} j={'endd'} setCell={setCell}
                              info={contact.endd ? contact.endd : ''}></Cell>
                        <span className="form_desc">Публикации</span>
                        <div>{contact.public.length == 0 ? 'Нет' : 'Да'}</div>
                        <span className="form_desc">Дата добавления</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={contact.data ? contact.data : ''}/>
                        <span className="form_desc">Кто добавил</span>
                        <input style={{width: '20px'}} disabled className="form_input"
                               value={contact.who ? contact.who : ''}/>
                    </div>
                    <div className="thirdLineCompanyForm companyForm" style={{display: 'flex', alignItems: 'flex-start'}}>
                        <span className="form_desc">Компания</span>
                        <div className="nameInForm" style={{fontSize: '20px', cursor: 'pointer'}}
                             onClick={() => goComp(company, 0)}>{company.name}</div>
                    </div>
                    <div className="companyFormHeader">Публикации</div>
                    <div className="thirdLineCompanyForm contactForm" style={{display: 'flex', flexDirection: 'column'}}>
                        {
                            contact.public.map((el) => (
                                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                    <span className="form_desc">Ссылка</span>
                                    <div>{el.split(' - ')[0]}</div>
                                    <span className="form_desc">Комментарий</span>
                                    <div>{el.split(' - ')[1]}</div>
                                </div>))
                        }
                    </div>
                    <div className="companyFormHeader">Источники информации</div>
                    <div className="thirdLineCompanyForm contactForm" style={{display: 'flex', flexDirection: 'column'}}>
                        {
                            contact.link.map((el) => (
                                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                                    <span className="form_desc">Ссылка</span>
                                    <div>{el.split(' - ')[0]}</div>
                                    <span className="form_desc">Комментарий</span>
                                    <div>{el.split(' - ')[1]}</div>
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

export default OneContact;