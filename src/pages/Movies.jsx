import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import { useSelector } from 'react-redux'
import Accordion from 'react-bootstrap/Accordion'
import { useEffect, useState } from 'react'

const Movies = () => {
  const { popularMovies } = useSelector((state) => state.movie)
  const [filterMovies, setFiltersMovies] = useState([])

  const handle = (method, keyword) => {
    // React에서 state는 불변성을 유지해야 하기 때문에
    // 전개 연산자를 통해서 새로운 배열을 생성하고 sort()함수를 실행해야함
    // 정렬된 배열을 state에 다시 초기화 해주면 영화정보가 정렬되어 출력되어진다.
    let list = [...filterMovies]
    let result = []

    if (method === '평점') {
      result =
        method === 'asc'
          ? list.sort((a, b) => a.vote_average - b.vote_average)
          : list.sort((a, b) => b.vote_average - a.vote_average)
    } else if (keyword === '인기도') {
      result =
        method === 'asc'
          ? list.sort((a, b) => a.popularity - b.popularity)
          : list.sort((a, b) => b.popularity - a.popularity)
    } else if (keyword === '제목') {
      result =
        method === 'asc'
          ? list.sort((a, b) => a.title.localeCompare(b.title))
          : list.sort((a, b) => b.title.localeCompare(a.title))
    }
    setFiltersMovies(result)
  }

  useEffect(() => {
    if (popularMovies.length !== 0) {
    }
  }, [])

  return (
    <div style={{ padding: '40px' }}>
      <h1>인기 영화 필터링</h1>
      <div className="all">
        <div className="sort">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>정렬</Accordion.Header>
              <Accordion.Body style={{ height: '69px' }}>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-split-basic"
                  >
                    정렬방식을 선택하세요.
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown">
                    <Dropdown.Item onClick={() => handle('제목', 'asc')}>
                      제목 오름차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handle('제목', 'desc')}>
                      제목 내림차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handle('평점', 'asc')}>
                      평점 오름차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handle('평점', 'desc')}>
                      평점 내림차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handle('인기도', 'asc')}>
                      인기도 오름차순
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handle('인기도', 'desc')}>
                      인기도 내림차순
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="pop">
          {filterMovies.map((item, index) => (
            <Card style={{ width: '15rem' }} key={index}>
              <Card.Img
                variant="top"
                src={`https://www.themoviedb.org/t/p/original${item.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.release_date}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Movies
