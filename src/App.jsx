import "./App.css";
import axios, { Axios } from "axios";
import { useState, useEffect } from "react";

function App() {
  //เก็บข้อมูลเป็น useState เมื่อexecute api
  const [getBook, setBook] = useState([]);
  //เก็บข้อมูลเป็น usestate กรณีที่เมื่อ search ใน input
  const [listBook, setListBook] = useState("");

  //กำหนด execute ถ้ามีชื่อหนังสือให้ execute request api
  useEffect(() => {
    if (listBook) {
      searchBook();
    }
  }, [listBook]);

  //ส่งrequest api เพื่อดึงข้อมูลจาก google โดยกำหนดหมวดหมู่ตามที่ค้นหา
  const searchBook = async () => {
    const dataBook = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${listBook}`
    );
    /* console.log(dataBook.data.items); */
    setBook(dataBook.data.items); //เก็บค่าข้อมูลเป็น Array usestate
  };
  return (
    <div className="App">
      {
        /* start coding here */
        <div>
          <label htmlFor="nameBh1ook">
            <h1>Find a Book</h1>
          </label>
          <input
            id="nameBook"
            type="text"
            className="input-nameBook"
            value={listBook}
            onChange={(event) => {
              setListBook(event.target.value);
            }}
          />
          {/* แสดงชื่อหนังสือที่เกี่ยวข้องออกมาทาง website  */}
          <ul className="list-book">
            {getBook.map((items, index) => {
              return <li key={index}>{items.volumeInfo.title}</li>;
            })}
          </ul>
        </div>
      }
    </div>
  );
}

export default App;
