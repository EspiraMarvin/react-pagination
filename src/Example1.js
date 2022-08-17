import { useState, useEffect } from 'react'
import { getPostsPage } from './api/axios' 
import Post from './Post'

function Example1() {
    const [page, setPage] = useState(1)
    const [posts, setPosts] =  useState([])

    useEffect(() => {
        getPostsPage(page).then(json => setPosts(json))
    }, [page])

    // jsx content
    const content = posts.map(post => <Post key={post.id} post={post} />)

    const nextPage = () => setPage(prev => prev + 1)

    const prevPage = () => setPage(prev => prev - 1)

  return (
    <>
        <nav>
            <button onClick={prevPage} disabled={page === 1}>Prev Page</button>
            <button onClick={nextPage} disabled={!posts.length}>Next Page</button>
            { content }
        </nav>
    </>
  )
}

export default Example1