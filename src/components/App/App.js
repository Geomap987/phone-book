import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Datatable from '../Datatable/Datatable';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import PhoneNumberStatistics from '../PhoneNumberStatistics/PhoneNumberStatistics';
import Statistics from '../Statistics/Statistics';
import ReturnButton from '../ReturnButton/ReturnButton';
import calls from '../../data/calls.json';

function App() {
  const [data] = React.useState(calls)
  const [singlePhoneNumber, setSinglePhoneNumber] = React.useState([])
  const [searchWord, setSearchWord] = React.useState('')

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
