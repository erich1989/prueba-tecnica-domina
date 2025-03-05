import React, { useContext, useEffect } from 'react';
import { ShopContext } from './contexts/shopContext';
import { RouterProvider } from "react-router-dom";
import router from "./routes";

import './App.css';
import actionCompany from './actions/company';

function App() {
    const { myPages, setMyPages } = useContext(ShopContext);

    const retunCompanyIdentity = async (host) => {
        try {
            const { response, status } = await actionCompany.returnIdentity({ host: host });
            if (status === 200) {
                console.log(response);
                localStorage.setItem('company', response);
                setMyPages(response.pages);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // console.log("myPages", myPages);

        const host = window.location.host;
        // console.log(host);
        retunCompanyIdentity(host);

    }, []);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;