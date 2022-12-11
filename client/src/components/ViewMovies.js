import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Movie from './Movie';
import "../App.css"
import { Button, Pagination } from '@mui/material';

const ViewMovies = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState("");
    const [filter1, setFilter1] = useState("");
    const [filter2, setFilter2] = useState("");
    const [currentPage, setCurrentPage] = useState(0)
    const [noOfPages, setNoOfPages] = useState(0);
    const [allMovies, setAllMovies] = useState([])

    const handlePageChange = (event, value) => {
        setCurrentPage(value - 1);
    };

    const buttonStyling = {
        marginRight: 12,
        marginTop: 12
    }

    useEffect(() => {
        fetchMoviesUsingSearchKey(0)
    }, [])

    useEffect(() => {
        console.log(allMovies)
        setMovies(allMovies.slice(currentPage * 5, currentPage * 5 + 5))
        setNoOfPages(Math.ceil(allMovies.length/5))

    }, [allMovies, currentPage])
    

    const fetchMoviesUsingSearchKey = (pageNumber) => {
        const body = { searchBody: query, page: pageNumber }
        setCurrentPage(0)
        axios.post("http://localhost:4000/movieSearch", body)
            .then(res => {
                setAllMovies(res.data.movies);
                console.log(res.data.movies);
                setMovies(res.data.currentPage);
                setNoOfPages(res.data.pages)
            })
    }

    const Filter = (filter1, filter2, data) => {
        setCurrentPage(0)

        let lowerDate = new Date(filter1);
        let upperDate = new Date(filter2);
        console.log("lower: " + lowerDate)
        console.log("upper: " + upperDate)

        setAllMovies(data.filter((item) => {
            let parsedDate = item.Released.split("/")
            let currDate = new Date(+parsedDate[2], parsedDate[1] - 1, +parsedDate[0]);

            console.log(currDate)
            return currDate > lowerDate && currDate < upperDate;
        }))
    }

    const sortById = (data) => {
        setCurrentPage(0)
        setAllMovies([...data].sort((a, b) => {
            return ('' + a._id).localeCompare(b._id);
        }))
    }

    const sortByCreation = (data) => {
        setCurrentPage(0)
        setAllMovies([...data].sort((a, b) =>
            compareCreationDate(a.createdAt, b.createdAt)))
    }


    const sortByReleased = (data) => {
        setCurrentPage(0)
        setAllMovies([...data].sort((a, b) =>
            compareReleasedDate(a.Released, b.Released)))
    }

    const compareReleasedDate = (date1, date2) => {
        let parsedDate1 = date1.split("/");
        let parsedDate2 = date2.split("/");
        let d1 = new Date(+parsedDate1[2], parsedDate1[1] - 1, +parsedDate1[0]);
        let d2 = new Date(+parsedDate2[2], parsedDate2[1] - 1, +parsedDate2[0]);
        return (d1 > d2) ? 1 : ((d1 < d2) ? -1 : 0);

    }

    const compareCreationDate = (date1, date2) => {

        let d1 = new Date(date1);
        let d2 = new Date(date2);
        return (d1 > d2) ? 1 : ((d1 < d2) ? -1 : 0);

    }

    return (
        <>
            <div>
                <input type="text" placeholder="Search movies..." className="search"
                    onChange={e => {
                        setQuery(e.target.value);
                    }} />
                <Button variant="contained" color="secondary" onClick={() => {
                    fetchMoviesUsingSearchKey(currentPage)
                }}>
                    Search
                </Button>
            </div>
            <div>
                <div className='Text'>Filter movies by release date</div>
                <input type="text" placeholder="dd/mm/yyyy" className="filterText" onChange={e => {
                    setFilter1(e.target.value);
                    if (e.target.value === "") {
                        setMovies(allMovies.slice(currentPage * 5, currentPage * 5 + 5))
                    }
                }} />
                <input type="text" placeholder="dd/mm/yyyy" className="filterText" onChange={e => {
                    setFilter2(e.target.value);
                    if (e.target.value === "") {
                        setMovies(allMovies.slice(currentPage * 5, currentPage * 5 + 5))
                    }
                }} />
                <Button variant="contained" color="secondary" onClick={() => Filter(filter1, filter2, allMovies)}>
                    Filter
                </Button>
            </div>
            <div>
                <Button variant="contained" color="secondary" onClick={() => sortById(allMovies)} style={buttonStyling}>
                    Sort by id
                </Button>
                <Button variant="contained" color="secondary" onClick={() => sortByCreation(allMovies)} style={buttonStyling}>
                    Sort by creation date
                </Button>
                <Button variant="contained" color="secondary" onClick={() => sortByReleased(allMovies)} style={buttonStyling}>
                    sort by release date
                </Button>
            </div>
            <div className='moviesTable'>
                {movies.map(movie => {
                    return <Movie data={movie} />;
                })
                }


            </div>
            {movies.length > 0 && <div className='pageNumber'>
                <Pagination count={noOfPages} shape="rounded" onChange={handlePageChange} />
            </div>}
        </>
    )
}

export default ViewMovies