import React, { createContext, useState } from 'react';

const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    const [openLoader, setOpenLoader] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [infoUser, setInfoUser] = useState(null);
    const [userAuthenticated, setUserAuthenticated] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [myPages, setMyPages] = useState([]);
    const [mySections, setMySections] = useState([]);
    const [myProducts, setMyProducts] = useState([]);
    const [myCategories, setMyCategories] = useState([]);
    const [myBrands, setMyBrands] = useState([]);
    const [myNewSale, setMyNewSale] = useState({});
    const [productDetail, setProductDetail] = useState({});
    const [errors, setErrors] = useState({
        firstNames: false,
        lastNames: false,
        IDcard: false,
        phoneNumber: false,
        email: false,
        // country: false,
        state: false,
        city: false,
        address: false,
        additionalAddress: false,
    });
    const [paymentCard, setPaymentCard] = useState(
        {
            total: 0,
            subTotal: 0,
            coupon: {
                apply: false,
                code: "",
                discountValue: 0,
                description: ""
            },
            billingDetails: {
                names: "",
                lastNames: "",
                idCard: "",
                phone: "",
                email: "",
                companyName: "",
                nit: "",
                country: "",
                state: "",
                city: "",
                address: "",
                addressLine2: "",
            }
        }
    );
    const [shoppingCar, setShoppingCar] = useState(
        {
            companyId: process.env.REACT_APP_ID_COMPANY,
            tableId: null,
            employeeId: null,
            customerId: null,
            products: [],
            saleType: 'online',
            trackingStatus: 'confirmed',
            responsiblePerson: {
                firstNames: '',
                lastNames: '',
                IDcard: '',
                phoneNumber: '',
                email: '',
            },
            dataEnterprise: {
                name: '',
                nit: '',
            },
            shippingAddress: {
                country: 'colombia',
                state: 'antioquia',
                city: 'medellín',
                address: '',
                additionalAddress: '',
            },
            shippingMethod: 'standard',
            shippingCost: 10000,
            shippingTrackingNumber: '',
            subtotal: 0,
            discount: {
                active: false,
                discountValue: 0,
                discountConcept: ''
            },
            total: 0,
            payment: {
                status: 'pending',
                method: 'pending',
                transactionId: null,
            },
            statusHistory: [
                {
                    status: 'confirmed',
                    timestamp: '',
                }
            ],
            notes: '',
            createdAt: '',
            updatedAt: '',
        }
    );


    const contextValues = {
        openLoader, setOpenLoader,
        isLoggedIn, setIsLoggedIn,
        shoppingCar, setShoppingCar,
        paymentCard, setPaymentCard,
        errors, setErrors,
        infoUser, setInfoUser,
        companies, setCompanies,
        myPages, setMyPages,
        mySections, setMySections,
        myProducts, setMyProducts,
        myCategories, setMyCategories,
        myBrands, setMyBrands,
        productDetail, setProductDetail,
        myNewSale, setMyNewSale,
        userAuthenticated, setUserAuthenticated
    }

    return (
        <ShopContext.Provider value={contextValues}>
            {children}
        </ShopContext.Provider>
    )
}

export { ShopContext, ShopContextProvider }



