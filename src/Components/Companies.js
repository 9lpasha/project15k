import {useEffect, useRef, useState} from "react";
import {ListGroup} from "react-bootstrap";
import OneCompany from "./OneCompany";
import OneObject from "./OneObject";
import OneContact from "./OneContact";
import OneYur from "./OneYur";

function Companies({}) {

    const [companies, setCompanies] = useState([])
    let [companyCur, setCompanyCur] = useState([{name: ''}, 0])
    let [objectCur, setObjectCur] = useState([{name: ''}, 0])
    let [contactCur, setContactCur] = useState([{name: ''}, 0])
    let [yurCur, setYurCur] = useState([{name: ''}, 0])
    let [visibleList, setVisibleList] = useState(1)
    let [visibleCompany, setVisibleCompany] = useState(0)
    let [visibleObject, setVisibleObject] = useState(0)
    let [visibleContact, setVisibleContact] = useState(0)
    let [visibleYur, setVisibleYur] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3001/getCompanyNames')
            .then(el => {
                console.log(el)
                return el.text()
            })
            .then((el) => {
                let res = JSON.parse(el)
                console.log(res)
                setCompanies(res)
            })
    }, [])

    let goToList = () => {
        setVisibleCompany(0)
        setVisibleObject(0)
        setVisibleContact(0)
        setVisibleYur(0)
        setVisibleList(1)
    }
    let goToCompany = () => {
        setVisibleCompany(1)
        setVisibleObject(0)
        setVisibleContact(0)
        setVisibleYur(0)
        setVisibleList(0)
    }
    let goToObject = (el, i) => {
        setObjectCur([el, i])
        setVisibleCompany(0)
        setVisibleObject(1)
        setVisibleContact(0)
        setVisibleYur(0)
        setVisibleList(0)
    }
    let goToContact = (el, i) => {
        setContactCur([el, i])
        setVisibleCompany(0)
        setVisibleObject(0)
        setVisibleContact(1)
        setVisibleYur(0)
        setVisibleList(0)
    }
    let goToYur = (el, i) => {
        setYurCur([el, i])
        setVisibleCompany(0)
        setVisibleObject(0)
        setVisibleContact(0)
        setVisibleYur(1)
        setVisibleList(0)
    }

    return (
        <div className="ListCompanies">
            <ListGroup style={visibleList ? {display: 'block'} : {display: 'none'}} as="ol" numbered>
            {
                companies.map((el, i)=> {
                    if(el.name)
                        return <ListGroup.Item onClick={()=>{
                            setCompanyCur([el, i])
                            goToCompany()
                        }} className="companyFromList" as="li">{el.name}</ListGroup.Item>
                })
            }
            </ListGroup>
            <OneCompany back={goToList} goCont={goToContact} goObj={goToObject} goYur={goToYur} visible={visibleCompany} comp={companyCur[0]} numOfCompany={companyCur[1]}></OneCompany>
            <OneObject back={goToCompany} goCont={goToContact} goComp={goToCompany} visible={visibleObject} obj={objectCur[0]} numOfObject={objectCur[1]}></OneObject>
            <OneContact back={goToCompany} goComp={goToCompany} visible={visibleContact} cont={contactCur[0]} numOfObject={objectCur[1]}></OneContact>
            <OneYur back={goToCompany} goComp={goToCompany} visible={visibleYur} yur={yurCur[0]} numOfCompany={yurCur[1]}></OneYur>
        </div>
    );
}

export default Companies;