import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [datas, setDatas] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/${url}`);
            const data = await response.json();
            if (data.success == false) {
                console.log(data.message);
                console.log(url);
                console.log(data);
                return;
            }
            if (data?.total) {
                setTotal(data?.total);
            }
            setDatas(data?.response)
        } catch (err) {
            console.error('Error fetching categories:', err.message);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, [url])

    return {
        datas, setDatas, total
    };
};

export default useFetch;
