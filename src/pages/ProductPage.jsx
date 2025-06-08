import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Header from '../components/Header';
import { useState } from 'react';
import EditProduct from '../components/EditProduct';
import { useUser } from '../context/UserContext';

function ProductPage() {

    const { id } = useParams();
    const { datas, setDatas } = useFetch(`/product/${id}`);
    const {currentUser}=useUser();

    const IMG_URL_1 = `http://localhost:3000/uploads/${datas?.images?.[0]}`;
    const IMG_URL_2 = `http://localhost:3000/uploads/${datas?.images?.[1]}`;
    const IMG_URL_3 = `http://localhost:3000/uploads/${datas?.images?.[2]}`;

    const [showEditProductModal, setShowEditProductModal] = useState(false);
    const {setCurrentUser}=useUser()

    const handleWhishList = async () => {
        try {
            const res = await fetch(`/api/user/whishList/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const data = await res.json();
            if (data?.success == false) {
                setError(data?.message);
                return;
            }
            setCurrentUser(data?.response);
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            {showEditProductModal && <EditProduct id={id} setShowEditProductModal={setShowEditProductModal} setDatas={setDatas} />}
            <div className='w-full h-screen overflow-hidden'>
                <Header />
                <div className='w-full h-full flex px-28 py-24'>

                    <div className='w-1/2 h-full'>
                        <div className='w-full h-80 border-2 border-slate-300 rounded-lg flex justify-center items-center'>
                            <img src={IMG_URL_1} className='w-1/2' />
                        </div>
                        <div className='mt-2 flex gap-2'>
                            <div className='w-1/2 h-28 border-2 border-slate-300 rounded-lg flex justify-center items-center'>
                                <img src={IMG_URL_2} alt="" className='w-32' />
                            </div>
                            <div className='w-1/2 h-28 border-2 border-slate-300 rounded-lg flex justify-center items-center'>
                                <img src={IMG_URL_3} alt="" className='w-32' />
                            </div>
                        </div>
                    </div>

                    <div className='bg-blue-700 w-1/2 h-full'>

                        <div className="w-full h-full bg-white p-6 font-sans space-y-4">
                            <h2 className="text-xl font-semibold text-sky-800">{datas?.title}</h2>
                            <p className="text-2xl font-bold">${datas?.variants?.length > 0 && datas?.variants[0]?.price}</p>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">Availability:</span>
                                <span className="text-green-600 font-medium flex items-center gap-1">
                                    ✅ In stock
                                </span>
                            </div>
                            <p className="text-sm text-gray-500">Hurry up! only 34 product left in stock!</p>

                            <hr className="border-gray-300" />

                            <div className="space-y-3">
                                <div className='flex items-center gap-2'>
                                    <label className="block text-sm font-medium mb-1">Ram:</label>
                                    <div className="flex gap-2">
                                        {datas?.variants?.length > 0 && datas.variants.map(({ ram }) => (
                                            <button
                                                key={ram}
                                                className={'px-3 py-1 border rounded bg-gray-100 text-gray-700'}
                                            >
                                                {ram} GB
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium">Quantity:</label>
                                    <button
                                        className="px-2 py-1 border rounded"
                                    >
                                        −
                                    </button>
                                    <span className="px-3">{datas?.variants?.[0]?.quantity}</span>
                                    <button
                                        className="px-2 py-1 border rounded"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>


                            <div className="flex gap-2 pt-4 w-full items-center">
                                <div className="flex w-44 px-2 justify-center">
                                    <button className="bg-button w-44 text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition"
                                        onClick={() => { setShowEditProductModal(true) }}>
                                        Edit Product
                                    </button>
                                </div>

                                <div className="flex w-44 px-2 justify-center">
                                    <button className="bg-button w-44 text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition">
                                        Buy it now
                                    </button>
                                </div>

                                <div>
                                    <button className={`border rounded-full w-10 h-10 p-2 text-gray-600 hover:text-black ${currentUser?.wishList?.includes(id)?'bg-red-300':''}`}
                                    onClick={handleWhishList} >
                                        ♡
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage