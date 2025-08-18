import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Aboutdef from '../Components/Aboutdef';
import Movie from '../Components/Movie';

const About = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

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
        setMovie(null);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (id && movie) {
    return <Movie movie={movie} />;
  } else {
    return <Aboutdef />;
  }
};

export default About;
