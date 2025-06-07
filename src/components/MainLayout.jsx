import { useState } from 'react'

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

    const { datas } = useFetch("product/get");
    console.log(datas, '---->');


    return (
        <div className=' flex-1 p-8 overflow-hidden'>

            <div className=' h-20 flex gap-2 justify-end text-white'>
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

            {showAddCategoryModal && <AddCategory setShowAddCategoryModal={setShowAddCategoryModal} />}
            {showAddSubCategoryModal && <AddSubCategory setShowAddSubCategoryModal={setShowAddSubCategoryModal} />}
            {showAddProductModal && <AddProduct setShowAddProductModal={setShowAddProductModal} />}

            <div className='h-full flex'>
                <Sidebar />
                <div className='w-full flex flex-col'>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 overflow-y-scroll p-4 gap-6">
                        {/* <Products /> */}
                    </div>
                    <Pagination />
                </div>
            </div>
        </div>
    )
}

export default MainLayout