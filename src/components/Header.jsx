import React from 'react';

const Header = () => {
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="">
            <header class="d-flex flex-wrap justify-content-end py-3 mb-4 border-bottom">
                <button className='btn btn-danger' onClick={logout}>Logout</button>
            </header>
        </div>
    );
};

export default Header;
