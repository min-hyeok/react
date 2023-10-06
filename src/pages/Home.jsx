import React, { useEffect, useState } from 'react'
import api from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { MovieReducerActions } from '../redux/reducers/movieSlice'
import Banner from '../components/Banner'
import MovieSlide from '../components/MovieSlide'
import ClipLoader from 'react-spinners/ClipLoader'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // const info = useSelector((state) => state.movie.popularMovies)
  // const top = useSelector((state) => state.movie.topRatedMovies)
  // const upcoming = useSelector((state) => state.movie.upcomingMovies)

  const { popularMovies, topRatedMovies, upcomingMovies } = useSelector(
    (state) => state.movie
  )

  // 3가지 종류의 영화 목록을 묶어서 요청하는 방법
  const getMovieList = async () => {
    setLoading(true) // 데이터를 가져오기 전
    const popularList = api.get('/movie/popular?language=ko-KR&page=1')
    const topRatedList = api.get('/movie/top_rated?language=ko-KR&page=1')
    const upcomingList = api.get('/movie/upcoming?language=ko-KR&page=1')
    const genreList = api.get('/genre/movie/list?language=ko')

    const [popualr, topRated, upcoming, genre] = await Promise.all([
      popularList,
      topRatedList,
      upcomingList,
      genreList,
    ])
    // console.log(popualr.data)
    // console.log(topRated.data)
    // console.log(upcoming.data)
    // console.log(genreList)

    setLoading(false)

    dispatch(
      MovieReducerActions.initData({
        popular: popualr.data,
        topRated: topRated.data,
        upcoming: upcoming.data,
        genre: genre.data,
      })
    )
  }

  useEffect(() => {
    getMovieList()
  }, [])

  // true : 데이터를 가져오기 전
  // false : 데이터를 가져온 후
  return (
    <>
      {loading ? (
        <ClipLoader size={200} color="whitesmoke" loading={loading} />
      ) : (
        <div>
          {popularMovies[0] !== undefined && (
            <Banner movie={popularMovies[11]} />
          )}
          <h1>인기있는 영화</h1>
          <MovieSlide movies={popularMovies} />
          <br />
          <h1>평점이 높은 영화</h1>
          <MovieSlide movies={topRatedMovies} />
          <br />
          <h1>개봉 예정 영화</h1>
          <MovieSlide movies={upcomingMovies} />
        </div>
      )}
    </>
  )
}

export default Home
