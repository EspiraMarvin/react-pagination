function PageButton({ pg, setPage }) {
  return (
    <button onClick={() => setPage(pg)}>{pg}</button>
  )
}

export default PageButton