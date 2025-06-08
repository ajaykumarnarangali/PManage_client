import { useState } from 'react'

function AddCategory({ setShowAddCategoryModal,setIsCategoryAdded }) {

    const [category, setCategory] = useState("");
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || category.length == 0) {
            return;
        }

        try {
            const res = await fetch('/api/category/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({category}),
            });

            const data = await res.json();
            if (data?.success == false) {
                setError(data?.message);
                return;
            }
            setIsCategoryAdded(Date.now());
            setShowAddCategoryModal(false);
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-80 transform -translate-x-1/2 -translate-y-1/2">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <h1 className='text-center mb-2'>Add Category</h1>
                    <input id="inputField" type="text" className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder='Enter Category name' value={category} onChange={(e) => { setCategory(e.target.value) }} />
                    <div className='flex justify-center gap-2'>
                        {error && <p className='text-red-400 my-2'>{error}</p>}
                        <button type="submit" className="bg-button px-3 text-white py-2 rounded-md">
                            ADD
                        </button>
                        <button className="bg-discardButton px-3 py-2 rounded-md"
                            onClick={() => { setShowAddCategoryModal(false) }}>
                            DISCARD
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddCategory