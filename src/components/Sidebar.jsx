import { useState } from 'react'
import useFetch from '../hooks/useFetch'


function Sidebar() {

  const { datas,setDatas } = useFetch("/category/Allcategories");

  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState({});

  const toggleExpand = (catId) => {
    setExpanded((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const toggleSelect = (subId) => {
    setSelected((prev) => ({
      ...prev,
      [subId]: !prev[subId],
    }));
  };

  return (
    <div className='h-full w-[30%] flex flex-col items-center'>
      <h1 className='text-center font-semibold text-header'>Categories</h1>
      <h1 className='text-center mt-2'>All Categories</h1>

      <div className="w-32 mt-2 px-1 flex flex-col items-start text-sm">
        {datas.map((cat) => (
          <div key={cat._id}>
            <div
              className="flex justify-between items-center cursor-pointer px-2 py-1"
              onClick={() => toggleExpand(cat._id)}
            >
              <span className='text-header my-1 w-20'>{cat.category}</span>
              <span className='text-gray-400 w-10 text-end'>{!!expanded[cat._id] ? '▼' : '▲'}</span>
            </div>

            {expanded[cat._id] && (
              <div className="ml-4 mt-1 space-y-1">
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub._id}
                    className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer'
                      }`}
                    onClick={() => toggleSelect(sub._id)}
                  >
                    <input
                      type="checkbox"
                      checked={!!selected[sub._id]}
                      className="accent-gray-800"
                    />
                    <label className="cursor-pointer">{sub.title}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Sidebar