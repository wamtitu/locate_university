import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [country, setCountry] = useState('');
  const [university, setUniversity] = useState([]);

  let search;
  const handleChange = (e)=>{
      search =e.target.value
  }
  const searchUniversity = ()=>{
    setCountry(search)
  }
  useEffect(()=>{
    const fetchUniversity = async ()=>{
      try{
        
          const response = await fetch(`https://universitiesapi.onrender.com/v1/api/universities/${country} `)
        const universities = await response.json()
        if(country)setUniversity(universities)
        
      }catch(error){
        console.log(error)
      }
    }
    fetchUniversity();
  }, [country])


  return (
    <>
      <div className='header'>
        <p>search universities here</p>
        <input onChange={handleChange}/>
        <button onClick={searchUniversity}>search</button>
        <h1>List of universities in {country}</h1>
        <p>Total search: {university.length-1} universities</p>
      </div>
      <div className='universities'>
        {university.map((uni, index)=>(
          <div className= 'item' key ={index}>
          <h4>Name: {uni.name}</h4>
          <p>Country: {uni.country}</p>
          <p>Code: {uni.alpha_two_code}</p>
          </div>
        )
        )}
      </div>
      
    </>
  )
}

export default App
