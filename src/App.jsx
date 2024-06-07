import "./App.css";
import { useState, useEffect } from "react"
import axios from "axios"

function App() {

  const [collectInput, setInput] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const getInputResult = (event) => {
    setInput(event.target.value)
    dataFetcher()
  }

  const dataFetcher = async () => {
    const fetch = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${collectInput}`)
    setSearchResult(fetch.data.items)
  }

  useEffect(() => {
    dataFetcher()
  },[])

  return <div className="App">
    <h1>Find a Book</h1>
    <input type="text" onChange={getInputResult} />
    <ul>
      {
        searchResult.map((item) => { 
          if (collectInput !== "") {
        return (
          <li>{item.volumeInfo.title}</li>
        )}
      })}
    </ul>
  </div>;
}

export default App;
