import useFetch from "../hooks/useFetch"
import { useUser } from '../context/UserContext'

function WishList({ setShowWhishList }) {
    const { setCurrentUser } = useUser();
    const { datas, setDatas } = useFetch('product/get/wish');
    const imageUrl = (img) => {
        return `http://localhost:3000/uploads/${img}`;
    }

    const removeFromWishList = async (id) => {
        try {
            const res = await fetch(`/api/product/remove/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();
            if (data?.success == false) {
                setError(data?.message);
                return;
            }
            console.log(data);
            setDatas(prev => prev.filter(item => item._id !== id));
            setCurrentUser(data?.response)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed right-0 top-0 h-full z-50 bg-white rounded-l-lg shadow-lg w-80">
                <div className='bg-header h-24 flex items-center justify-between px-4'>
                    <div className='flex items-center gap-2'>
                        <button className="border rounded-full w-10 h-10 p-2 bg-white text-gray-600 hover:text-black">
                            ♡
                        </button>
                        <h1 className='text-white'>Items</h1>
                    </div>
                    <div className="text-white text-xl cursor-pointer"
                        onClick={() => { setShowWhishList(false) }}>
                        &gt;
                    </div>
                </div>
                {
                    datas?.length > 0 && datas.map((product) => (
                        <div className="flex items-center justify-between gap-4 border-b pb-4 mb-4 p-3">
                            <img
                                src={imageUrl(product?.images?.[0])}
                                alt={product.title}
                                className="w-16 h-16 object-cover rounded-xl"
                            />
                            <div className="flex-1 flex-col gap-1">
                                <h3 className="font-medium text-sm text-blue-800">{product.title}</h3>
                                <p className="text-sm font-semibold">${product?.variants?.[0]?.price}</p>
                                <p className="text-gray-600 flex-1">★ ★ ★ ★ ★</p>
                            </div>

                            <button className="text-gray-500 hover:text-red-500" onClick={() => { removeFromWishList(product._id) }}>
                                <div className="bg-white border border-slate-200 rounded-full h-6 w-6">
                                    X
                                </div>
                            </button>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default WishList