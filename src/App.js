import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const getAllData = () => {

  let list = localStorage.getItem('lists')


  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return []
  }
}


const App = () => {

  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState(getAllData())
  const [toggleSubmit, setToggleSubmit] = useState(true)
  const [neweditItems , setNewEditItems] = useState(null) 

  const addItems = () => {

    if (!inputData) {
       alert("Plz Write Something...")
    }else if(inputData && !toggleSubmit){

      setItems (
         items.map((elem) => {
             
              if(elem.id === neweditItems){
                 return {...elem, name:inputData}
              }
              return elem
         })
      )

      setInputData('')

      setToggleSubmit(true)
  
  
      setNewEditItems(null)

       
    }  
    else {

      const allInputData = { id: new Date().getTime().toString(), name: inputData }

      console.log(allInputData);

      setItems([...items, allInputData])
      setInputData('')
    }
  }


  const deleteItems = (id) => {

    const newArray = items.filter((elem) => {
      return elem.id !== id
    })

    setItems(newArray)
  }


  const editItems = (id) => {

    const editItemsArray = items.find((elem) => {
      return elem.id === id
    })

    setInputData(editItemsArray.name)

    setToggleSubmit(false)


    setNewEditItems(id)


  }


  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items))
  }, [items])

  return (
    <div>
      <div>
        <input type="text" value={inputData} onChange={(e) => {
          setInputData(e.target.value)
        }} />
        {
          toggleSubmit ? <button onClick={addItems}>Add</button> : <button onClick={addItems}>Update</button>
        }
        <button onClick={() => setItems([])}>Clear</button>
      </div>
      <div>
        {
          items.map((elem) => {
            return (
              <div key={elem.id}>
                <p>{elem.name}</p>
                <button onClick={() => editItems(elem.id)}>Edit</button>
                <button onClick={() => deleteItems(elem.id)}>Delete</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App