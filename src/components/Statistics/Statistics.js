/* eslint-disable array-callback-return */
/* eslint-disable no-useless-concat */
import React from 'react';
import './Statistics.css'
import { Scrollbars } from 'react-custom-scrollbars';

function Statistics({ data }) {
    const [filterItem, setFilterItem] = React.useState('')
    const [filteredData, setFilteredData] = React.useState([])
    const [title, setTitle] = React.useState('Параметр')

    function handleClick(e) {
        setFilterItem(e.target.dataset.filter)
        setTitle(e.target.dataset.title)
    }

    React.useEffect(function filtration() {
        if (!filterItem) { return }
        else if (filterItem === 'number' || filterItem === 'agent') {
            const results = data.map((obj) => obj[filterItem]).reduce((acc, rec, index) => {
                return (typeof acc[rec] !== 'undefined')
                    ? { ...acc, [rec]: acc[rec] + 1 }
                    : { ...acc, [rec]: 1 }
            }, {})
            setFilteredData(Object.entries(results))
        }
        else if (filterItem === 'calltime') {
            const dateArray = data.map((obj) => {
                const time = new Date((obj.calltime) * 1000)
                return `${time.getFullYear()}` + '-' + '0' + `${time.getMonth() + 1}` + '-' + `${('0' + time.getDate()).slice(-2)}`
            })
            const results = dateArray.reduce((acc, rec, index) => {
                return (typeof acc[rec] !== 'undefined')
                    ? { ...acc, [rec]: acc[rec] + 1 }
                    : { ...acc, [rec]: 1 }
            }, {})
            setFilteredData(Object.entries(results))
        }
        else {
            const keyArray = data.map((obj) => obj[filterItem])
            const step = (Math.max(...keyArray) - Math.min(...keyArray)) / 10
            const stepArray = [0]
            for (let i = -0; i <= 10; i++) {
                const item = Math.ceil(Math.min(...keyArray) + step * i)
                stepArray.push(item)
            }
            const results = {}
            for (let i = 0; i <= 10; i++) {
                let count = 0;
                keyArray.map((item) => {
                    if (item > stepArray[i] && item <= stepArray[i + 1])
                        count += 1
                })
                const key = `${stepArray[i]}` + '-' + `${stepArray[i + 1]}`
                results[key] = count
            }
            setFilteredData(Object.entries(results))
        }
    }, [filterItem, data])

    return (
        <section className="statistics">
            <h1 className="statistics__title">Статистика количества звонков</h1>
            <div className="statistics__option-container">
                <div className="statistics__option" data-filter="number" data-title="Номер телефона" onClick={handleClick}>По номеру телефона</div>
                <div className="statistics__option" data-filter="calltime" data-title="Дата" onClick={handleClick}>
                    По дате
                </div>
                <div className="statistics__option" data-filter="s_in_wait" data-title="Длительность ожидания (сек)" onClick={handleClick}>
                    По длительности ожидания&nbsp;(сек)
                </div>
                <div className="statistics__option" data-filter="s_in_talk" data-title="Длительность ожидания (сек)" onClick={handleClick}>
                    По длительности разговора&nbsp;(сек)
                </div>
                <div className="statistics__option" data-filter="agent" data-title="ID оператора" onClick={handleClick}>
                    По ID оператора
                </div>
            </div>
            <div className="statistics__container">
            <table className="statistics__table">
                <thead>
                    <tr>
                        <th>{title}</th>
                        <th>Количество звонков</th>
                    </tr>
                </thead>
            </table>
            <Scrollbars className="statistics__scroll">
            <table className="statistics__table">
                <tbody>
                    {filteredData.map((row) => <tr className="row">
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                    </tr>)
                    }
                </tbody>
            </table>
            </Scrollbars>
           </div>
        </section>
    );
}


export default Statistics;