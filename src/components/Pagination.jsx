
function Pagination({ TOTAL_PAGES, currentPage, setCurrentPage, setUrl, LIMIT }) {

    const handlePagination = (index) => {
        const nextPage = index + 1;
        setCurrentPage(nextPage);
        setUrl(`product/get?limit=${LIMIT}&page=${currentPage}`);
    }

    return (
        <div className='h-28'>
            <div className='flex w-full items-center justify-center gap-2'>
                {[...Array(TOTAL_PAGES)].map((_, index) => (
                    <button key={index} className={`w-12 border rounded-lg bg-button p-3 font-bold ${currentPage - 1 == index ? 'bg-orange-500' : ''}`}
                        onClick={() => { handlePagination(index) }}>
                        {index + 1}
                    </button>
                ))
                }
            </div>
        </div>
    )
}

export default Pagination