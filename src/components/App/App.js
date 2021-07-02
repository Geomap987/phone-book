import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Datatable from '../Datatable/Datatable';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import PhoneNumberStatistics from '../PhoneNumberStatistics/PhoneNumberStatistics';
import Statistics from '../Statistics/Statistics';
import ReturnButton from '../ReturnButton/ReturnButton';

function App() {
  const [data, setData] = React.useState([])
  const [singlePhoneNumber, setSinglePhoneNumber] = React.useState([])
  console.log(data)
  const [searchWord, setSearchWord] = React.useState('')
  console.log(searchWord)

  useEffect(() => {
    fetch('http://109.248.175.136:5000')
      .then((res) => res.json())
      .then((json) => {
        const callsData = json.data;
        const columns = json.columns;

        return callsData.map((item) => {
          const newItem = {};
          for (let i = 0; i < callsData.length; i++) {
            newItem[`${columns[i]}`] = item[i]
          }
          return newItem
        })

      })
      .then((newData) => setData(newData))
      .catch((err) => console.log(err))
  }, [])

  function handleSearch(a) {
    setSearchWord(a)
  }

  function showResults(rows) {
    return rows.filter(function (row) {
      if (searchWord) {
        return row.agent === Number(searchWord) || row.number === Number(searchWord)
      } else {
        return row
      }
    })
  }

  function handlePhoneNumber(number) {
    setSinglePhoneNumber(number)
  }

  function showSinglePhoneData(rows) {
    return rows.filter(function (row) {
      if (singlePhoneNumber) {
        return row.number === Number(singlePhoneNumber)
      } else {
        return row
      }
    })
  }

  function doNothing() {
    return
  }

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <SearchForm onSearchWord={handleSearch} />
          <Datatable data={showResults(data)} onNumberClick={handlePhoneNumber} />
        </Route>
        <Route path="/phone">
          <PhoneNumberStatistics number={singlePhoneNumber} amount={showSinglePhoneData(data).length} />
          <Datatable data={showSinglePhoneData(data)} onNumberClick={doNothing} />
          <ReturnButton />
        </Route>
        <Route path="/stat">
          <Statistics data={data} />
          <ReturnButton />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
