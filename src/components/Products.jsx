import { Link } from "react-router-dom"
import { useUser } from "../context/UserContext"

function Products({ product }) {

    const IMAGE_URL = `http://localhost:3000/uploads/${product?.images[0]}`
    return (
        <div className="bg-white rounded-lg p-4 flex flex-col border-2 border-gray-200 h-fit">
            <Link to={`/product/${product?._id}`}>
                <img
                    src={IMAGE_URL}
                    alt={product.title}
                    className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2 text-header">{product?.title}</h3>
                <p className="text-gray-600 flex-1">${product?.variants[0]?.price}</p>
                <p className="text-gray-600 flex-1">★ ★ ★ ★ ★</p>
            </Link>
        </div>
    )
}

export default Products