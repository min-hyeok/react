import React from 'react'
import Badge from 'react-bootstrap/Badge'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MovieCard = ({ movies }) => {
  const genre = useSelector((state) => state.movie.genreList)
  // console.log('[MovieCard genreList]', genre)

  // console.log('[Card.jsx]', movies)
  // https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/
  const div = {
    backgroundImage: `url(https://www.themoviedb.org/t/p/w355_and_h200_multi_faces${movies.poster_path})`,
    width: '300px',
    height: '150px',
  }

  return (
    <>
      <div style={div} className="card">
        <Link to={`/movies/${movies.id}`}>
          <div className="hide">
            <h3>{movies.title}</h3>
            <div className="genres">
              {movies.genre_ids.map((id) => (
                <Badge bg="danger" key={id}>
                  {/* find() : 일치한 정보 중 첫번째 요소만 반환하는 함수 */}
                  {genre.find((item) => id === item.id).name}
                </Badge>
              ))}
            </div>
            <br />
            <span>
              {`평점 : ${movies.vote_average}점`}
              <span style={{ marginRight: '5px', marginLeft: '5px' }}>|</span>
              {movies.adult ? '청불' : '청소년관람'}
            </span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default MovieCard
