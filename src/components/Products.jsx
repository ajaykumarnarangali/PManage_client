import React from 'react'

function Products({ product }) {

    return (
        <div className="bg-white rounded-lg p-4 flex flex-col border-2 border-gray-200 h-fit">
            <img
                src={product.image[0]}
                alt={product.title}
                className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-2 text-header">{product?.title}</h3>
            <p className="text-gray-600 flex-1">${product?.price}</p>
            <p className="text-gray-600 flex-1">★ ★ ★ ★ ★</p>
        </div>
    )
}

export default Products