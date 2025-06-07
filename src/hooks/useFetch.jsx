import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [datas, setDatas] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/${url}`);
            const data = await response.json();
            console.log(data);
            if(data.success==false){
                console.log(data.message);
                return;
            }

            setDatas(data?.response)
        } catch (err) {
            console.error('Error fetching categories:', err.message);
            return [];
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    return {
        datas
    };
};

export default useFetch;
