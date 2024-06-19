import React from 'react'
import { useParams ,useLoaderData} from 'react-router-dom'
import Aboutdef from '../Components/Aboutdef'
import Movie from '../Components/Movie'
import { useEffect,useState } from 'react';

const About = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  // const movie = useLoaderData();
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`); // Replace with your API endpoint
        if (!res.ok) {
          throw new Error('Movie not found');
        }
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
        setMovie(null); // Set movie to null if there's an error or if movie not found
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]); // Dependency array ensures fetchMovie runs when id changes

  if (id && movie) {
    return <Movie movie={movie} />;
  } else {
    return <Aboutdef />;
  }
};

// const AboutMovie = async ({ params }) => {
//   if (!params.id) {
//     console.log("No id found");
//     return null;
//   } else {
//     const res = await fetch(`/api/movies/${params.id}`);
//     const data = await res.json();
//     return data;
//   }
// };


export default About;
