import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import MovieCard from './MovieCard'

const MovieSlide = ({ movies }) => {
  console.log('[MovieSlide.jsx]', movies)
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
  }

  return (
    <div style={{ height: '150px' }}>
      <Carousel responsive={responsive}>
        {movies.map((item) => (
          <MovieCard key={item.id} movies={item} />
        ))}
      </Carousel>
    </div>
  )
}

export default MovieSlide
