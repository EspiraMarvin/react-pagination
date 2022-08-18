import React, { useState, useEffect } from 'react'
import './example3.css'

function Example3() {
    const [data, setData] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5) 

    //show limited page numbers
    const [pageNumberLimit, setPageNumberLimit] = useState(5) // how many page numbers we want to display
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)



    const pages = []
    // we divide the length of our data with the items per page number to get total no of pages needed for our data
    // Math.ceil rounds off a number into the next largest integer
    for (let i = 1; i <= Math.ceil(data.length/itemsPerPage); i++) {
        pages.push(i)
    } 

    // get how many items we want for a single page - calculate index of last item in each page
    const indexOfLastItem = currentPage*itemsPerPage  // 5*10 = 50
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    
    // slice data for each page  - using index of first & last items
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id)) // id is the page number
    }

    const handlePrevBtn = () => {
        // if (currentPage === pages[0]) //  return // prevents clicking prev btn when first page is 1 - currentPage === 1

        setCurrentPage(prev => prev - 1)

        if ((currentPage-1)%pageNumberLimit === 0){
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)

        }
     }

    const handleNextBtn = () => { 
        // if (currentPage === pages[pages.length-1]) return // prevents clicking next btn when last page === last page / no when no data is in the current page selected

        setCurrentPage(prev => prev + 1)

        if (currentPage+1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)

        }
    }


    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => setData(json))

    }, [])


    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number>minPageNumberLimit) {
            return (
                <li
                 key={number} id={number} onClick={handleClick}
                 className={currentPage === number ? 'active' : null}
                >
                    {number}
                </li>
            )
        } else {
            return null
        }
    })

    const renderData = data => {
        return (
            <ul className='list'>
                {data.map((todo, index) => {
                    return <li key={index}>{todo.title}</li>
                })}
            </ul>
        )
    }

    let pageIncrementBtn = null
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextBtn}>&hellip;</li>
        
    }

    let pageDecrementBtn = null
    if (minPageNumberLimit > 1) {
        pageDecrementBtn = <li onClick={handlePrevBtn}>&hellip;</li>
        
    }

    const handleLoadMore = () => {
        setItemsPerPage(prev => prev + 5) //increase items by 5
    }

    const handleLoadLess = () => {
        setItemsPerPage(prev => prev - 5) //increase items by 5
    }

  return (
    <>
    <h1> Todo List</h1>
    <ul className="pageNumbers">
        <li>
            <button disabled={currentPage === pages[0]} onClick={handlePrevBtn}>Prev</button>
        </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
        <li>
            <button disabled={currentPage === pages[pages.length-1]} onClick={handleNextBtn}>Next</button>
        </li>
    </ul>

    {renderData(currentItems)}

    <button onClick={handleLoadMore} className="loadmore">load more</button>
    <button onClick={handleLoadLess} disabled={itemsPerPage <= 5 } className="loadmore">load less</button>
    
    </>
  )
}

export default Example3