import React, { useEffect, useState } from 'react'

const Fetch = () => {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [newData,setNewData]=useState({ title: '', body: '' });
    const [posting,setPosting]=useState(false);
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>res.json())
        .then((data)=>{
            setData(data.slice(0,10));
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    },[])

    const handleInputChange=(e)=>{
        const {name,value} = e.target;
        setNewData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true);

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((post) => {
        setData((prevData) => [post, ...prevData.slice(0, 9)]); // Add new post and limit to 10 items
        setNewData({ title: '', body: '' }); // Clear input fields
        setPosting(false);
      })
      .catch((error) => {
        console.log(error);
        setPosting(false);
      });
  };
    if (loading) {
    return <p>Loading data...</p>;
  }
  return (
    <div>
        <h2>fetched data</h2>
        <ul>
            {data.map((i)=>(
                <li key={i.id}>{i.title},{i.body}</li>
            ))}
        </ul>
        <h3>Post req</h3>
        <form onSubmit={handleSubmit}>
            <input name="title" onChange={handleInputChange} value={newData.title} placeholder="enter title"></input>
            <br></br>
            <textarea name="body" onChange={handleInputChange} value={newData.body} placeholder="enter body"></textarea>
            <button>{posting ? 'Posting...' : 'Submit'}</button>
        </form>
        
    </div>
  )
}

export default Fetch