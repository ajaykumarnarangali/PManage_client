import useFetch from "../hooks/useFetch";
import { useState, useEffect } from "react";

function EditProduct({ setShowEditProductModal, id, setDatas }) {
    //fetching subcategorires
    const { datas: Subcategories } = useFetch("subCategory/all");
    const { datas } = useFetch(`/product/${id}`);

    const [product, setProduct] = useState({
        title: '',
        subCategoryId: '',
        description: '',
        variants: [{ ram: '', price: '', quantity: 1 }],
        images: []
    });

    const [error, setError] = useState(null);

    //adding initial value to product
    useEffect(() => {
        if (datas) {
            setProduct({
                title: datas.title || '',
                subCategoryId: datas.subCategoryId || '',
                description: datas.description || '',
                variants: datas.variants || [{ ram: '', price: '', quantity: 1 }],
                images: datas.images || []
            });
        }
    }, [datas]);

    //managing variant changes
    const handleVariantChange = (index, field, value) => {
        let newVariant = [...product.variants];
        newVariant[index][field] = value;
        setProduct({ ...product, variants: newVariant });
    }

    //add form for new variants
    const addVariants = () => {
        setProduct(prev => ({
            ...prev,
            variants: [...prev.variants, { ram: '', price: '', quantity: 1 }]
        }));
    }

    //managing state chages
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => {
            return { ...prev, [name]: value }
        })
    }

    //for image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setProduct(prev => ({ ...prev, images: [...prev.images, ...files] }));
    };


    const imageUrl = (img) => {
        return img instanceof File
            ? URL.createObjectURL(img)
            : `http://localhost:3000/uploads/${img}`;
    }


    //adding products
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validVariants = product.variants.filter(variant =>
            variant.ram.trim() !== '' &&
            variant.price !== '' &&
            variant.quantity > 0
        );

        const formData = new FormData();

        formData.append("title", product.title);
        formData.append("description", product.description);
        formData.append("subCategoryId", product.subCategoryId);
        formData.append("variants", JSON.stringify(validVariants));

        if (product.images && product.images.length > 0) {
            product.images.forEach((img) => {
                formData.append("images", img);
            });
        }

        try {

            const res = await fetch(`/api/product/edit/${id}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await res.json();

            if (data.success == false) {
                setError(data.message);
                return
            }

            setDatas(data?.response);
            setShowEditProductModal(false);

        } catch (error) {
            setError(error.message);
        }

    }
    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed max-w-2xl w-full top-1/2 left-1/2 z-50 bg-white rounded-lg shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <h1 className='text-center mb-2'>Edit Product</h1>

                    <div className="mb-4 flex gap-2 items-center">
                        <label className=" mb-1 text-gray-600 w-32">Title:</label>
                        <input
                            name="title"
                            type="text"
                            value={product.title}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter product title"
                        />
                    </div>

                    <div className="mb-4 flex gap-2">
                        <label className="block mb-1 text-gray-600 w-32 p-0">Variants:</label>
                        <div className='flex flex-col items-start w-full'>

                            {product.variants.map((v, i) => (
                                <div key={i} className="flex items-center gap-3 mb-2">
                                    <div className="mb-4 flex gap-2 items-center">
                                        <label className=" mb-1 text-gray-600">Ram:</label>
                                        <input
                                            type="number"
                                            placeholder="RAM"
                                            max={12}
                                            value={v.ram}
                                            onChange={(e) => { handleVariantChange(i, "ram", e.target.value) }}
                                            className="w-24 p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4 flex gap-2 items-center">
                                        <label className=" mb-1 text-gray-600">Price:</label>
                                        <input
                                            type="number"
                                            placeholder="Price"
                                            max={1000000}
                                            value={v.price}
                                            onChange={(e) => { handleVariantChange(i, "price", e.target.value) }}
                                            className="w-32 p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="mb-4 flex gap-2 items-center">
                                        <label className=" mb-1 text-gray-600">Quantity:</label>
                                        <input
                                            type="number"
                                            placeholder="Qty"
                                            max={100}
                                            value={v.quantity}
                                            onChange={(e) => { handleVariantChange(i, "quantity", e.target.value) }}
                                            className="w-20 p-2 border border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="bg-gray-800 text-white px-4 py-2 rounded-md mt-2 ms-auto"
                                onClick={addVariants}
                            >
                                Add variants
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 flex items-center gap-2">
                        <label className="block mb-1 text-gray-600 w-32">Sub category :</label>
                        <select
                            name="subCategoryId"
                            value={product.subCategoryId}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Select Subcategory --</option>
                            {
                                Subcategories.length > 0 &&
                                Subcategories.map((subcategory, ind) => (
                                    <option value={subcategory?._id}>{subcategory?.title}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="mb-4 flex gap-2">
                        <label className="block mb-1 text-gray-600 w-32">Description :</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4 flex gap-2">
                        <label className="block mb-1 text-gray-600">Upload image:</label>
                        <div>
                            <div className="flex gap-2">
                                {product.images.length > 0 && product.images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl(img)}
                                        alt={`preview-${index}`}
                                        className="w-16 h-16 object-cover border rounded-md"
                                    />
                                ))}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="mb-2 outline-none"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    {error && <p className='my-2 text-red-300'>{error}</p>}
                    <div className='flex justify-center gap-2'>
                        <button type="submit" className="bg-button px-3 text-white py-2 rounded-md">
                            EDIT
                        </button>
                        <button className="bg-discardButton px-3 py-2 rounded-md"
                            onClick={() => { setShowEditProductModal(false) }}>
                            DISCARD
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProduct