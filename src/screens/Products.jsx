import React, { useEffect, useState } from 'react'
import '../assets/css/styles.css'
import { useNavigate } from 'react-router-dom';

import { getDocs, collection, doc, count } from 'firebase/firestore'
import { db } from '../firebase/config';

function Products() {

    const [CartCount, setCartCount] = useState(0);

    const handleCartCount = () => {
        setCartCount(CartCount+1)
    }

    const navigate = useNavigate();

    const [menuClass, setMenuClass] = useState('nav__menu')

    const handleMenu = () => {
        setMenuClass(prevClass => (prevClass === 'nav__menu show' ? 'nav__menu' : 'nav__menu show'));
    };

    const closeMenu = () => {
        setMenuClass('nav__menu');
        navigate('/')
    };

    const [Products, setProducts] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const data = await getDocs(collection(db, 'products'));
            setProducts(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })))
        }

        getProducts()
        console.log(Products);

    }, [])


    const handleNavAi = () =>{
        navigate('/try-with-ai')
    }

    return (
        <>
            <header className="l-header" id="header">
                <nav className="nav bd-grid">
                    <div className="nav__toggle" id="nav-toggle" onClick={handleMenu}>
                        <i className="bx bxs-grid"></i>
                    </div>

                    <a href="#" className="nav__logo">Luxe & Lynx</a>

                    <div className={menuClass} id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a className="nav__link" onClick={closeMenu}>Home</a>
                            </li>
                        <i onClick={handleNavAi} className="fa-solid fa-wand-sparkles nav__item"></i>

                        </ul>
                    </div>

                    <div className="nav__shop rrr">
                        {/* <div className="circle_count">
                            <p>1</p>
                        </div> */}
                        <i className="bx bx-shopping-bag badge" value={CartCount} ></i>
                    </div>
                </nav>
            </header>


            <main className="l-main">
                <section className="featured section" id="shop">
                    <h2 className="section-title">All Products</h2>

                    <div className="featured__container bd-grid">
                        {
                            Products.map((item) => {
                                return (
                                    <article className="sneaker" key={item.id}>
                                        <div className="sneaker__sale">Sale</div>
                                        <img src={item.image} alt="" className="sneaker__img" />
                                        <span className="sneaker__name"> {item.title} </span>
                                        <span className="sneaker__preci">${item.amount}</span>
                                        <a onClick={handleCartCount} className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
                                    </article>
                                );
                            })
                        }
                    </div>

                    <div className="sneaker__pages bd-grid">
                        <div>
                            <span className="sneaker__pag">1</span>
                            <span className="sneaker__pag">2</span>
                            <span className="sneaker__pag">3</span>
                            <span className="sneaker__pag">4</span>
                            <span className="sneaker__pag">
                                <i className='bx bxs-chevron-right'></i>
                            </span>
                        </div>
                    </div>
                </section>
            </main>

            {/* <!--===== FOOTER =====--> */}
            <footer className="footer section">
                <div className="footer__container bd-grid">
                    <div className="footer__box">
                        <h3 className="footer__title">Roby</h3>
                        <p className="footer__description">New collection of shoes 2024 </p>
                    </div>
                    <div className="footer__box">
                        <h3 className="footer__title">Explore</h3>
                        <ul>
                            <li><a href="#home" className="footer__1ink">Home</a></li>
                            <li><a href="#featured" className="footer__link">Featured</a></li>
                            <li><a href="#women" className="footer__link">Women</a></li>
                            <li><a href="#new" className="footer__link">new</a></li>
                        </ul>
                    </div>
                    <div className="footer__box">
                        <h3 className="footer__title">Support</h3>
                        <ul>
                            <li><a href="#" className="footer__1ink">Prodcut Help</a></li>
                            <li><a href="#" className="footer__link">Customer Care</a></li>
                            <li><a href="#" className="footer__link">Autharized Service</a></li>
                        </ul>
                    </div>
                    <div className="footer__box">
                        <div className="footer__link">
                            <a href="#" className="footer__social"><i className='bx bxl-facebook'></i></a>
                            <a href="#" className="footer__social"><i className='bx bxl-instagram'></i></a>
                            <a href="#" className="footer__social"><i className='bx bxl-twitter'></i></a>
                            <a href="#" className="footer__social"><i className='bx bxl-google'></i></a>
                        </div>
                    </div>
                </div>

                <p className="footer__copy">&#169; 2020 Bedimcode. All right reserved </p>
            </footer>
        </>
    )
}

export default Products