import { useEffect, useState } from 'react'
import { useUser } from '../context/UserContext'
import { useLocation, useNavigate } from 'react-router-dom';
import WishList from './WishList';

function Header() {

    const { currentUser, setCurrentUser } = useUser();
    const [showWhisList, setShowWhishList] = useState(false);

    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.search == '') {
            setSearch('');
        }
    }, [location])

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/home?search=${search}`);
    }

    const handleSignout = () => {
        setCurrentUser(null);
        navigate(`/home`);
    }

    return (
        <>
            {showWhisList && <WishList setShowWhishList={setShowWhishList} />}
            <div className='w-full h-24 bg-header p- flex items-center justify-between px-14'>
                <div className=' w-[438px] bg-white h-14 rounded-2xl ms-52'>
                    <form className='h-full w-full' onSubmit={handleSearch}>
                        <input type="text" className='border-none outline-none h-full ms-2 rounded-2xl'
                            value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        <button className='bg-button h-full w-32 rounded-2xl float-end text-white'>
                            Search
                        </button>
                    </form>
                </div>
                <div className='flex gap-3'>
                    <div className='flex items-center gap-1' onClick={() => { setShowWhishList(true) }}>
                        <i className="fa-solid fa-heart cursor-pointer" style={{ color: 'red' }}></i>
                        <div className='bg-button w-5 h-5 rounded-full flex items-center justify-center'>
                            {currentUser?.wishList?.length && currentUser?.wishList?.length}
                        </div>
                    </div>
                    <div className='flex items-center gap-1 text-white'>
                        {currentUser?.username}
                    </div>
                    <div className='flex items-center gap-1 text-red-300 text-base cursor-pointer' onClick={handleSignout}>
                        {/* <i className="fa-solid fa-cart-shopping cursor-pointer" style={{ color: 'green' }}></i>
                        <div className='bg-button w-5 h-5 rounded-full flex items-center justify-center'>0</div> */}
                        signout
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header