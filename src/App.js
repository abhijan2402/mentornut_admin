import { useEffect } from 'react';
import './App.css';
import { db, storage } from "./firebase";
import { collection, query, getDocs, documentId, where, getFirestore, doc, updateDoc } from "firebase/firestore";
import { useState } from 'react';
// initialize Firestore


function App() {
  useEffect(() => {
    getData();
  }, []);
  const [data, setdata] = useState([]);
  const [note, setnote] = useState("")
  const [AddForm, setAddForm] = useState(false)
  const [ShowName, setShowName] = useState("")
  const getData = async () => {
    let resultArray = [];
    const q = query(collection(db, "FormData"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      resultArray.push({ id: doc.id, ...doc.data() });
    });
    console.log(resultArray)
    setdata(resultArray);
    console.log(data)
  };
  const AddNote = async (item) => {
    if (note == "") {
      alert("please add some note for selected person")
    }
    else {
      console.log(item, "bhjnhb");
      console.log(note, "uhbjn");
      const docRef = doc(db, "FormData", `${item.id}`);
      const data = {
        Name: item.Name,
        Date: item.Date,
        Mobile: item.Mobile,
        Note: note,
        Class: item.Class,
        Problem: item.Problem
      };

      await updateDoc(docRef, data)
        .then(docRef => {
          console.log("A New Document Field has been added to an existing document");
          getData()
          setAddForm(false)
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
  const change = (item) => {
    setShowName(item.Name)
    setAddForm(true)
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>ADMIN APP</h1>
      <div style={{ width: "100%", textAlign: "center", margin: "2% 0%" }}>

        {
          AddForm ?
            <div style={{ width: "100%" }}>
              <h4>Add Note for {ShowName}</h4>
              <input style={{ width: "30%" }} type='text' onChange={(e) => { setnote(e.target.value) }} />
            </div>
            : null}

      </div>
      <div className="App">
        <table className='MainDiv'>
          <tr className='tablerow'>
            <th style={{ width: "5%" }}>Sno</th>
            <th>Date</th>
            <th>Name</th>
            <th>Number</th>
            <th>Class</th>
            <th style={{ width: "25%" }}>Problem</th>
            <th>Note</th>
          </tr>
          {
            data.map((item, sno = 1) => (
              <tr className='tablerow'>
                <td style={{ width: "5%" }}>{++sno}</td>
                <td>{item.Date}</td>
                <td>{item.Name}</td>
                <td>{item.Mobile}</td>
                <td>{item.Class}</td>
                <td style={{ width: "25%" }}>{item.Problem}</td>
                <td>{item.Note}</td>
                <td style={{ width: "30%" }}><button onClick={() => { AddNote(item) }}>Add Note</button></td>
                <td style={{ width: "30%" }}><button onClick={() => { change(item) }}>Form</button></td>
              </tr>
            ))
          }

        </table>

      </div>
    </>
  );
}

export default App;
