import logo from './logo.svg';
import './App.css';
import allContacts from './contacts.json'
import { useState } from 'react'

let contacts = allContacts.slice(0, 5)
let remainingContacts = allContacts.slice(5);

function App() {

  const [myContacts, setContacts] = useState(contacts);

  function addRandom() {
    let randomContactIndex = Math.floor(Math.random() * (remainingContacts.length));
    let randomContact = remainingContacts.splice(randomContactIndex, 1)[0];
    setContacts([...myContacts, randomContact]);
    console.log(remainingContacts)
  }

  function deleteContact(name) {
    let deletedContact;
    const filteredArray = myContacts.filter(e => {
      if (e.name === name) {
        deletedContact = e;
      }
      return e.name !== name
    })
    remainingContacts.push(deletedContact)
    setContacts(filteredArray)
  }

  // function deleteContact(name) {
  //   let copyArray = [...myContacts]
  //   let foundContactIndex = copyArray.findIndex(e => {
  //     return e.name === name
  //   })
  //   let foundContact = copyArray.splice(foundContactIndex, 1)[0];
  //   remainingContacts.push(foundContact);
  //   setContacts(copyArray)
  // }

  function sortPopularity() {
    let copyArray = [...myContacts]
    copyArray.sort((a, b) => {
      return b.popularity - a.popularity
    })
    setContacts(copyArray)
  }

  function sortName() {
    let copyArray = [...myContacts]
    copyArray.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    setContacts(copyArray)
  }

  return (
    <div className="App">
      <h3>IronContacts</h3>
      <button onClick={() => addRandom()}>Add Random Contact</button>
      <button onClick={() => sortPopularity()}>Sort by popularity</button>
      <button onClick={() => sortName()}>Sort by name</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            myContacts.map(e => {
              return (
                <tr key={e.name}>
                  <td>
                    <img style={{ height: "70px" }} src={e.pictureUrl} alt="profile photo" />
                  </td>
                  <td>
                    {e.name}
                  </td>
                  <td>
                    {e.popularity}
                  </td>
                  {e.wonOscar ? <td>🏆</td> : <td></td>}
                  {e.wonEmmy ? <td>🏆</td> : <td></td>}
                  <td>
                    <button onClick={() => deleteContact(e.name)}>Delete</button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
