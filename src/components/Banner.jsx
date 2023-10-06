import React from 'react'

const Banner = ({ movie }) => {
  console.log('banner.jsx', movie)

  const div_style = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path})`,
    height: '600px',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <div style={div_style} className="banner">
      <div
        style={{
          marginLeft: '20px',
          width: '45%',
          zIndex: 1,
        }}
      >
        <p className="title">{movie.title}</p>
        <p>{movie.overview}</p>
      </div>
    </div>
  )
}

export default Banner
