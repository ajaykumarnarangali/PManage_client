import { useState } from "react";
import useFetch from "../hooks/useFetch"


function AddSubCategory({ setShowAddSubCategoryModal }) {

  const { datas: categories } = useFetch("category/all");

  const [subCategory, setSubCategory] = useState("");
  const [categoryId, setCategroryId] = useState(null);
  const [error,setError]=useState(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!subCategory || !categoryId) {
      return;
    }

    try {
      const res = await fetch('/api/subCategory/add', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId,subCategory }),
      });

      const data = await res.json();
      if (data?.success == false) {
        setError(data?.message);
        return;
      }
      console.log(data);
      setShowAddSubCategoryModal(false);
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed top-1/2 left-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-80 transform -translate-x-1/2 -translate-y-1/2">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h1 className='text-center mb-2'>Add Sub Category</h1>
          <select
            id="category"
            className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            onChange={(e) => setCategroryId(e.target.value)}
          >
            <option value={null}>-- Select Category --</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
          <input id="inputField" type="text" className="border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder='Enter Sub Category name' onChange={(e) => { setSubCategory(e.target.value) }} />
          {error && <p className="text-red-500 my-2">{error}</p>}
          <div className='flex justify-center gap-2'>
            <button type="submit" className="bg-button px-3 text-white py-2 rounded-md">
              ADD
            </button>
            <button className="bg-discardButton px-3 py-2 rounded-md"
              onClick={() => { setShowAddSubCategoryModal(false) }}>
              DISCARD
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddSubCategory