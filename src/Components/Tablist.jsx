import React from 'react';
import Tab from './Tab';
import {useState,useEffect} from 'react'

const Tablist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
      const fetchMovies = async () => {
        try{
          const res = await fetch('http://localhost:5000/movies');
          const data = await res.json();
          setMovies(data);
        }catch(err){
          console.log("There is a error",err);
        }finally{
          setLoading(false);
        }
       }
      fetchMovies();
   },[]);
  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie, index) => (
          <Tab key={index} 
          title={movie.title} 
          description={movie.description}
          studio={movie.studio}
          year={movie.releasing_year}
          />
        ))}
      </div>
    </div>
  );
};

export default Tablist;
