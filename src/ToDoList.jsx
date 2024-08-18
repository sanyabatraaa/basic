import React, { useState } from 'react'

const ToDoList = () => {
    const [items,setItems]=useState([]);
    const [newItems,setNewItems]=useState('');
    const handleItemsChange=(e)=>{
        if(newItems.trim()){
            setItems([...items,newItems.trim()]);
            setNewItems('');
        }
    }
  return (
    <div>
        <input type="text"  onChange={(e) => setNewItems(e.target.value)} value={newItems} plaeholder="enter item"></input>
        <button onClick={handleItemsChange}>Submit</button>
        <ul>
            {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ul>
    </div>
  )
}

export default ToDoList