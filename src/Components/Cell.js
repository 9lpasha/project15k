import './Cell.css';
import {useEffect, useRef, useState} from "react";
import delet from '../images/x.png'

function Cell({info, setCell, i, select, type, defaul, j, id, num, name_table, companyNames, kolvo, objectNames}) {

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

    let segment = ['Крупные офисы класса А',
        'Современные заводы',
        'ЖК премиум',
        'Общественные пространства',
        'Бизнес-центры А и А+']

    let role = ['ЛПР',
        'Заинтересованное лицо',
        'Технический эксперт'
    ]

    let status2 = ['Холодный',
        'В разработке',
        'Контакт установлен',
        'Теплый',
        'В переговорах',
        'Потерян/Клиент']

    let company
    if (companyNames)
        company = [...companyNames]
    let object
    if (objectNames)
        object = [...objectNames]

    let comp_comment = [4, 5, 6, 7, 8]
    let obj_comment = []
    let cont_comment = [7, 8, 9, 10, 12]
    let comment = () => {
        if (name_table == 'comp')
            return comp_comment
        if (name_table == 'obj')
            return obj_comment
        if (name_table == 'cont')
            return cont_comment
    }

    let nameOfTable = () => {
        if (name_table == 'comp')
            return 'companies'
        if (name_table == 'obj')
            return 'objects'
        if (name_table == 'cont')
            return 'contacts'
        if (name_table == 'yur')
            return 'yur'
    }

    let valueInput = useRef()
    let input1 = useRef()
    let input2 = useRef()
    let miniModal = useRef()

    let [selectFocus, setSelectFocus] = useState(0)

    let onChange = () => {
        console.log('мы в blur', valueInput.current.textContent)
        if (kolvo>=i+1)
            setCell(valueInput.current.textContent, id, j, i + 1, nameOfTable())
        else if(valueInput.current.textContent)
            setCell(valueInput.current.textContent, id, j, i + 1, nameOfTable())
        else if(valueInput.current.textContent == '')
            setCell('', id, j, i + 1, nameOfTable())
    }

    let onInsertSelect = (k, e) => {
        console.log(e.target)
        if (selectFocus == 1) {
            if (e.target.value == 'Добавить') {
                miniModal.current.style.display = 'flex'
                document.querySelector('.App').onclick = (e) => {
                    const withinBoundaries = e.composedPath().includes(miniModal.current);
                    if (!withinBoundaries) {
                        miniModal.current.style.display = 'none'
                        document.querySelector('.App').onclick = () => {
                        }
                    }
                }
            } else {
                if ((j == 'company' || j == 'status' || j == 'status2' || j == 'role' || j == 'object') && e.target.value)
                    setCell(e.target.value, id, j, i + 1, nameOfTable())
                else if((j == 'company' || j == 'status' || j == 'status2' || j == 'role' || j == 'object') && e.target.value == '')
                    setCell('', id, j, i + 1, nameOfTable())
            }
            setSelectFocus(0)
        } else {
            setSelectFocus(1)
        }
    }

    let insertOnePointFunc = () => {
        console.log(info[info.length - 1])
        miniModal.current.style.display = 'none'
        if (type == 's') {
            //if (info[info.length - 2] != '') {
                if (new Set(comment()).has(num))
                    setCell([...info.filter((el)=>{if(el != 'Добавить' && el != '') return el})/*slice(0, info.length - 1)*/, input1.current.value + '  -  ' + input2.current.value].join(';'), id, j, i + 1, nameOfTable())
                else
                    setCell([...info.filter((el)=>{if(el != 'Добавить' && el != '') return el})/*slice(0, info.length - 1)*/, input1.current.value].join(';'), id, j, i + 1, nameOfTable())
            /*} else {
                if (new Set(comment()).has(num))
                    setCell([...info.slice(0, info.length - 2), input1.current.value + '  -  ' + input2.current.value].join(';'), id, j, i + 1)
                else
                    setCell([...info.slice(0, info.length - 2), input1.current.value].join(';'), id, j, i + 1)
            }*/
        }
        input1.current.value = ''
    }

    let deleteOnePointFunc = (e) => {
        let endAr = []
        info.forEach((el) => {
            if(el != e.target.parentNode.textContent)
                endAr.push(el)
        })
        setCell(endAr.filter((el)=>{if(el != 'Добавить' && el != '') return el}).join(';'), id, j, i + 1, nameOfTable())
    }

    let insertSelectList = () => {
        if (j == 'industry')
            return industries
        if (j == 'website')
            return ''
        if (j == 'phone')
            return ''
        if (j == 'email')
            return ''
        if (j == 'situation')
            return situation
        if (j == 'link')
            return ''
        if (j == 'status')
            return status
        if (j == 'segment')
            return segment
        if (j == 'company')
            return company
        if (j == 'object')
            return object
        if (j == 'role')
            return role
        if (j == 'status2')
            return status2
        if (j == 'public')
            return ''
    }

    useEffect(()=>{if(valueInput.current.localName == 'div')valueInput.current.textContent = info},[])

    if (type == 's')
        return (
            <div className="cellDiv" style={{display: 'flex', justifyContent: 'flex-end'}}>
                {Array.isArray(info) ?
                    <div>
                        {info.map((elem, ij) => {
                            if (elem != '' && elem != 'Добавить')
                                return <div
                                style={{position: 'relative', padding: '0 20px 0 5px', width: '250px', height: '25px', lineHeight: '20px', overflow: 'hidden', margin: '2px', borderRadius: '5px', border: '1px dotted grey'}}
                                key={j + ij + select + ' r'}>{elem}<img onClick={deleteOnePointFunc} style={{position: 'absolute', top: '3px', right: '3px'}} src={delet} alt=""/></div>
                        })}
                    </div> : (info != '' ? <div className='valOfSelect' style={{
                        width: '250px',
                        margin: '2px'
                    }}>{info}</div> : null)
                }
                <select onBlur={() => setSelectFocus(0)}
                        onClick={(e) => onInsertSelect(select, e)} ref={valueInput}
                        onChange={(e) => {
                            if (!e.target.value) e.preventDefault()
                        }}
                        name="" id="" style={{textAlign: 'center'}}
                        defaultValue={info}>
                    {/*Array.isArray(info) ? info.map((elem, ij) => (
                            <option key={j + ij + select} value={elem}>{elem}</option>)) :
                        ['', ...insertSelectList()].map((el) => (<option key={el} value={el}>{el}</option>))
                    */
                        Array.isArray(info) ?
                            <option value="Добавить">Добавить</option> :
                            ['', ...insertSelectList()].map((elem, ij) => (<option key={j + ij + select} value={elem}>{elem}</option>))
                    }
                </select>
                <div style={{display: 'none'}} ref={miniModal} className="miniModal">
                    {insertSelectList() != '' ?
                        <select ref={input1} name="" id="">
                            {insertSelectList().map((el) => <option key={el} value={el}>{el}</option>)}
                        </select> :
                        <input style={{display: 'inline'}} placeholder="поле" ref={input1} type="text"/>
                    }
                    {new Set(comment()).has(num) ?
                        <input style={{display: 'inline'}} placeholder="комментарий" ref={input2} type="text"/> : null
                    }
                    <div onClick={() => insertOnePointFunc()} style={{display: 'inline'}}
                         className="butInsert">Создать
                    </div>
                    <div onClick={() => miniModal.current.style.display = 'none'} style={{display: 'inline'}}
                         className="butInsert">Отменить
                    </div>
                </div>
            </div>
        )
    else {
        if (j == 'data')
            return (
                <>
                    <input
                        onBlur={() => {
                            onChange()
                        }}
                        id={i + j}
                        onClick={() => console.log(info, i, defaul)}
                        ref={valueInput} value={new Date(info[0]).toLocaleDateString()} type={type} disabled={
                        (j == 'data' || (j == 'area' && name_table == 'comp') || (j == 'money' && name_table == 'comp')) ? true : false
                    }
                        style={{visibility: (j == 'data' || j == 'area' || j == 'money') ? (info[1] ? 'visible' : 'hidden') : 'visible'}}
                    />
                </>
            );
        else if ((j == 'area' && name_table == 'comp') || (j == 'money' && name_table == 'comp')) {
            return (
                <>
                    <input
                        onBlur={() => {
                            onChange()
                        }}
                        id={i + j}
                        onClick={() => console.log(info, i, defaul)}
                        ref={valueInput} defaultValue={info[0]} type={type} disabled={
                        (j == 'data' || (j == 'area' && name_table == 'comp') || (j == 'money' && name_table == 'comp')) ? true : false
                    }
                        style={{visibility: (j == 'data' || j == 'area' || j == 'money') ? (info[1] ? 'visible' : 'hidden') : 'visible'}}
                    />
                </>
            )
        } else
            return (
                <>
                    <div className="valOfSelect"
                        contentEditable
                        onBlur={() => {
                            onChange()
                        }}
                        id={i + j}
                        onClick={() => console.log(info, i, defaul)}
                        ref={valueInput} type={type} disabled={
                        (j == 'idsort' || j == 'data' || (j == 'area' && name_table == 'comp') || (j == 'money' && name_table == 'comp')) ? true : false
                    }
                        style={{visibility: (j == 'data') ? (info[1] ? 'visible' : 'hidden') : 'visible', padding: '0 5px', textAlign: 'center'}}
                    />
                </>
            )
    }
}

export default Cell;