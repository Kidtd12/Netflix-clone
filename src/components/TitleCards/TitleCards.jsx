import React, { useState } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';




const TitleCards = ({title, category}) => {

const [apiData, setApiData] = useState([]);
// Example data, replace with actual API data if needed
   
const cardsRef = useRef();


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTFlODE0ZDNmM2RiNzdkMGY3MmQxOTlhZDVlNzA5OCIsIm5iZiI6MTc1NDgxOTQ4NC43Nywic3ViIjoiNjg5ODZiOWMyYWM0MThiZjUxNWUzMTliIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OYwWyt3Mb-jXTvIan_c_JqEAvrlYZob6mmpXSNZUKV4'
  }
};


const handleWheel = (event) => {
   event.preventDefault();
   cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  
fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener('wheel', handleWheel) 
},[])

  return (
  <div className='title-cards'>
    <h2>{title?title:"Popular on Netflix"}</h2>
    <div className="card-list" ref={cardsRef}>
      {apiData.map((card, index) => {
        return  <Link to={`player/${card.id}`}className='card' key={index}>
            
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </Link>
      })}
    </div>
  </div>
)
}

export default TitleCards