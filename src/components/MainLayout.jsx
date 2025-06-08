import { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom';


import Sidebar from './Sidebar';
import Products from './Products';
import Pagination from './Pagination';

import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import AddSubCategory from './AddSubCategory'
import useFetch from '../hooks/useFetch';

function MainLayout() {

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddSubCategoryModal, setShowAddSubCategoryModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    //for re-rendering when new category is adding 
    const [isCategoryAdded, setIsCategoryAdded] = useState(null);

    const LIMIT = 1;
    const [currentPage, setCurrentPage] = useState(1);
    const [url, setUrl] = useState(`product/get?limit=${LIMIT}&page=${currentPage}`)

    const [searchParams] = useSearchParams();
    let search = searchParams.get('search') || '';
    let subcat = searchParams.get('subcat') || '';
    const location = useLocation();

    useEffect(() => {
        if (search.trim()) {
            setUrl(`product/get?search=${encodeURIComponent(search)}`);
        } else if (subcat) {
            setUrl(`product/get?subcat=${encodeURIComponent(subcat)}`);
        }
    }, [search, subcat]);

    const { datas, total, setDatas } = useFetch(url);

    const TOTAL_PAGES = Math.ceil(total / LIMIT);

    return (
        <div className=' flex-1 p-8 overflow-hidden'>

            <div className=' h-20 flex gap-2 text-white items-center justify-between px-5'>
                <div className='font-bold text-base text-header'>
                    <Link to={'/home'}>
                        Home
                    </Link>
                </div>
                <div className='flex gap-2'>
                    <button className='bg-button h-14 w-fit px-3 rounded-2xl float-end'
                        onClick={() => { setShowAddCategoryModal(true) }}>
                        Add category
                    </button>
                    <button className='bg-button h-14 w-fit px-3 rounded-2xl float-end'
                        onClick={() => { setShowAddSubCategoryModal(true) }}>
                        Add sub category
                    </button>
                    <button className='bg-button h-14 w-fit px-3 rounded-2xl float-end'
                        onClick={() => { setShowAddProductModal(true) }}>
                        Add product
                    </button>
                </div>
            </div>

            {showAddCategoryModal && <AddCategory setShowAddCategoryModal={setShowAddCategoryModal} setIsCategoryAdded={setIsCategoryAdded} />}
            {showAddSubCategoryModal && <AddSubCategory setShowAddSubCategoryModal={setShowAddSubCategoryModal} setIsCategoryAdded={setIsCategoryAdded} />}
            {showAddProductModal && <AddProduct setShowAddProductModal={setShowAddProductModal} setDatas={setDatas} />}

            <div className='h-full flex'>
                <Sidebar isCategoryAdded={isCategoryAdded} />
                <div className='w-full flex flex-col'>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-scroll p-4 gap-6">
                        {datas?.length > 0 ? (
                            datas.map((product, ind) => (
                                <Products key={ind} product={product} />
                            ))
                        ) : (
                            <div>
                                No products found.
                            </div>
                        )}
                    </div>
                    {location.pathname === "/home" && location.search === "" &&
                        <Pagination LIMIT={LIMIT} TOTAL_PAGES={TOTAL_PAGES} currentPage={currentPage} setUrl={setUrl} setCurrentPage={setCurrentPage} />
                    }
                </div>
            </div>
        </div>
    )
}

export default MainLayout