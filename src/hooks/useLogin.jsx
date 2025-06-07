import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const useLogin = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { currentUser, setCurrentUser } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/home");
        }
    }, [currentUser]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const { email, password } = formData;
        if (!email || !password) {
            setError("All fields are required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError("");

        try {
            const res = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data?.success == false) {
                setError(data?.message);
                return;
            }
            setCurrentUser(data?.user);
            setFormData({ email: "", password: "" });
            navigate('/home');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        loading,
        error
    };
};

export default useLogin;
