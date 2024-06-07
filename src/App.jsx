import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [bookList, setBookList] = useState([]);

  // console.log(bookList);

  const findBooks = async (event) => {
    let books = event.target.value;
    if (books.length > 0) {
      const resultBook = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${books}`
      );
      setBookList(resultBook.data.items);
    } else {
      setBookList([]);
    }
  };

  return (
    <div className="App">
      {/* start coding here */}
      <h1>Find a Book</h1>
      <input id="book" name="book" type="text" onChange={findBooks} />
      <ul>
        {bookList?.map((item, index) => {
          return <li key={index}>{item.volumeInfo.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
