import "./App.css";
import { useState, useEffect } from "react"
import axios from "axios"
import { DebounceInput } from 'react-debounce-input'

function App() {

  const [collectInput, setInput] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const getInputResult = (event) => {
    setInput(event.target.value)
  }

  const dataFetcher = async () => {
    const fetch = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${collectInput}`)
    setSearchResult(fetch.data.items)
  }

  useEffect(() => {
    dataFetcher()
  },[collectInput])

  return <div className="App">
    <h1>Find a Book</h1>
    <DebounceInput minLength={2} debounceTimeout={500} type="text" onChange={getInputResult} />
    <ul>
    {searchResult.length > 0 ? searchResult.map((item) => (
    <li key={item.id}>{item.volumeInfo.title}</li> )) : null }
    </ul>
  </div>;
}

export default App;
