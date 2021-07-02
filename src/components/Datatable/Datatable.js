import React from 'react';
import { Link } from 'react-router-dom';
import './Datatable.css';
import { Scrollbars } from 'react-custom-scrollbars';

function Datatable({ data, onNumberClick }) {
    const [ascendingIsClicked, setAscendingisClicked] = React.useState(false)
    const [descendingIsClicked, setDescendingisClicked] = React.useState(false)
    const [sortedData, setSortedData] = React.useState([])

    React.useEffect(function () {

        if (ascendingIsClicked === true) {
            setSortedData(sortingByDateAscending(data))
        }
        else if (descendingIsClicked === true) {
            setSortedData(sortingByDateDescending(data))
        }
        else {
            setSortedData(data)
        }
    }, [ascendingIsClicked, descendingIsClicked, data])

    function convertTime(timestamp) {
        const d = new Date(timestamp * 1000) 
        const yyyy = d.getFullYear()
        const mm = ('0' + (d.getMonth() + 1)).slice(-2)  
        const dd = ('0' + d.getDate()).slice(-2) 
        const hh = d.getHours()
        const min = ('0' + d.getMinutes()).slice(-2)  
        const time = yyyy + '-' + mm + '-' + dd + ', ' + hh + ':' + min
        return time;
    }

    function phoneFormatter(phone) {
        const phoneString = phone.toString().split('');
        phoneString.splice(1, "", "(");
        phoneString.splice(5, "", ")");
        phoneString.splice(9, "", "-");
        phoneString.splice(12, "", "-");
        return '+' + phoneString.join('')
    }

    function sortingByDateAscending(array) {
        return array.sort(function (a, b) {
            return a.calltime - b.calltime
        })
    }

    function sortingByDateDescending(array) {
        return array.sort(function (a, b) {
            return b.calltime - a.calltime
        })
    }

    function handleAscending() {
        setAscendingisClicked(true)
        setDescendingisClicked(false)
    }

    function handleDescending() {
        setAscendingisClicked(false)
        setDescendingisClicked(true)
    }

    function handleNumberClick(e) {
        onNumberClick(e.target.dataset.number)
    }

    return (
        <section className="table">
            <table>
                <thead>
                    <tr>
                        <th>Номер телефона
                            <span className="table__info" title="Для получения данных о звонках нажмите на номер телефона">&#128712;</span>
                        </th>
                        <th className="table__header-box">Дата и время звонка
                            <div>
                                <button onClick={handleAscending} className={ascendingIsClicked ? `table__header-button table__header-button_active` : `table__header-button`} title="Сортировка по возрастанию">&#9650;</button>
                                <button onClick={handleDescending} className={descendingIsClicked ? `table__header-button table__header-button_active` : `table__header-button`} title="Сортировка по убыванию">&#9660;</button>
                            </div>
                        </th>
                        <th>Время ожидания (сек)</th>
                        <th>Время разговора (сек)</th>
                        <th>ID оператора</th>
                    </tr>
                </thead>
            </table>
            <Scrollbars className="table__scroll">
                <table>
                    <tbody>
                        {
                            sortedData.map(row => <tr className="row" key={Math.random()}>
                                <td ><Link className="table__link" to="/phone" onClick={handleNumberClick} data-number={row.number}>{phoneFormatter(row.number)}</Link></td>
                                <td>{convertTime(row.calltime)}</td>
                                <td>{row.s_in_wait}</td>
                                <td>{row.s_in_talk}</td>
                                <td>{row.agent}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </Scrollbars>
        </section>
    )
}

export default Datatable;