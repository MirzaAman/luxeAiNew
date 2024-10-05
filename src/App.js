import React, { useEffect, useState } from 'react';
import './assets/css/styles.css'; // Make sure this path is correct based on where you store your CSS
import { useNavigate } from 'react-router-dom';

import imghome from './assets/img/imghome.png'

import featured1 from './assets/img/featured1.png'
import featured2 from './assets/img/featured2.png'
import featured3 from './assets/img/featured3.png'

function App() {

  const navigate = useNavigate();

  const [menuClass, setMenuClass] = useState('nav__menu')

  useEffect(() => {


    // ===== SCROLL SECTIONS ACTIVE LINK =====
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', scrollActive);

    function scrollActive() {
      const scrollY = window.scrollY;
    
      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
    
        if (link) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    }
    

    // ===== CHANGE COLOR HEADER =====
    window.onscroll = () => {
      const nav = document.getElementById('header');
      if (window.scrollY >= 200) nav.classList.add('scroll-header');
      else nav.classList.remove('scroll-header');
    };
  }, []);


  const handleMenu = () => {
    setMenuClass(prevClass => (prevClass === 'nav__menu show' ? 'nav__menu' : 'nav__menu show'));
  };

  const closeMenu = () => {
    setMenuClass('nav__menu');
  };

  const handleNavigateProducts = () => {
    closeMenu()
    navigate('/products');
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
          <a href="#home" className="nav__link" onClick={closeMenu}>Home</a>
        </li>
        <li className="nav__item">
          <a href="#featured" className="nav__link" onClick={closeMenu}>Featured</a>
        </li>
        <li className="nav__item">
          <a href="#women" className="nav__link" onClick={closeMenu}>Women</a>
        </li>
        <li className="nav__item">
          <a href="#new" className="nav__link" onClick={closeMenu}>New</a>
        </li>
        <li className="nav__item">
          <a className="nav__link" onClick={handleNavigateProducts}>Shop</a>
        </li>
      </ul>
    </div>

    <div className="nav__shop">
      <i className="bx bx-shopping-bag"></i>
    </div>
  </nav>
</header>


      <main className="l-main">
        {/* HOME SECTION */}
        <section className="home" id="home">
          <div className="home__container bd-grid">
            <div className="home__sneaker">
              <div className="home__shape"></div>
              <img src={imghome} alt="" className="home__img" />
            </div>

            <div className="home__data">
              <span className="home__new">New in</span>
              <h1 className="home__title">YEEZY BOOST <br /> SPLY - 350</h1>
              <p className="home__description">Explore the new collections of sneakers</p>
              <a href="#" className="button">Explore Now</a>
            </div>
          </div>
        </section>

        {/* FEATURED SECTION */}
        <section className="featured section" id="featured">
          <h2 className="section-title">FEATURED</h2>

          <div className="featured__container bd-grid">
            <article className="sneaker">
              <div className="sneaker__sale">Sale</div>
              <img src={featured1} alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
            <article className="sneaker">
              <div className="sneaker__sale">Sale</div>
              <img src={featured2} alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
            <article className="sneaker">
              <div className="sneaker__sale">Sale</div>
              <img src={featured3} alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
          </div>
        </section>

        {/* COLLECTION SECTION */}
        <section className="collection section">
          <div className="collection__container bd-grid">
            <div className="collection__card">
              <div className="collection__data">
                <h3 className="collection__name">Nike</h3>
                <p className="collection__description">New collection 2024</p>
                <a href="#" className="button-light">Buy now <i className="bx bx-right-arrow-alt button-icon"></i> </a>
              </div>

              <img src="assets/img/collection1.png" alt="" className="collection__img" />
            </div>
            <div className="collection__card">
              <div className="collection__data">
                <h3 className="collection__name">Adidas</h3>
                <p className="collection__description">New collection 2024</p>
                <a href="#" className="button-light">Buy now <i className="bx bx-right-arrow-alt button-icon"></i> </a>
              </div>

              <img src="assets/img/collection2.png" alt="" className="collection__img" />
            </div>
          </div>
        </section>

        {/* WOMEN SNEAKERS SECTION */}
        <section className="women section" id="women">
          <h2 className="section-title">WOMEN SNEAKERS</h2>
          <div className="women__container bd-grid">
            <article className="sneaker">
              <img src="assets/img/women1.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
            <article className="sneaker">
              <img src="assets/img/women2.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
            <article className="sneaker">
              <img src="assets/img/women3.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
            <article className="sneaker">
              <img src="assets/img/women4.png" alt="" className="sneaker__img" />
              <span className="sneaker__name">Nike Jordan</span>
              <span className="sneaker__preci">$149.99</span>
              <a href="" className="button-light">Add to Cart <i className="bx bx-right-arrow-alt button-icon"></i></a>
            </article>
          </div>
        </section>

        {/* OFFER SECTION */}
        <section className="offer section">
          <div className="offer__container bd-grid">
            <div className="offer__data">
              <h3 className="offer__title">50% OFF</h3>
              <p className="offer__description">In Adidas Superstar sneakers</p>
              <a href="#" className="button">Shop now</a>
            </div>

            <img src="assets/img/offert.png" alt="" className="offer__img" />
          </div>
        </section>

        {/* NEW COLLECTION SECTION */}
        <section class="new section" id="new">
            <h2 class="section-title">NEW COLLECTION</h2>
            <div class="new__container bd-grid">
                <div class="new__mens">
                    <img src="assets/img/new1.png" alt="" class="new__mens-img"/>
                    <h3 class="new__title">Mens Shoes</h3>
                    <span class="new__preci">From $79.99</span>
                    <a href="#" class="button-light">View Collection <i
                            class='bx bx-right-arrow-alt button-icon'></i></a>
                </div>

                <div class="new__sneaker">
                    <div class="new__sneaker-card">
                        <img src="assets/img/new2.png" alt="" class="new__sneaker-img"/>
                        <div class="new__sneaker-overlay">
                            <a href="#" class="button">Add to Cart</a>
                        </div>
                    </div>
                    <div class="new__sneaker-card">
                        <img src="assets/img/new3.png" alt="" class="new__sneaker-img"/>
                        <div class="new__sneaker-overlay">
                            <a href="#" class="button">Add to Cart</a>
                        </div>
                    </div>
                    <div class="new__sneaker-card">
                        <img src="assets/img/new4.png" alt="" class="new__sneaker-img"/>
                        <div class="new__sneaker-overlay">
                            <a href="#" class="button">Add to Cart</a>
                        </div>
                    </div>
                    <div class="new__sneaker-card">
                        <img src="assets/img/new5.png" alt="" class="new__sneaker-img"/>
                        <div class="new__sneaker-overlay">
                            <a href="#" class="button">Add to Cart</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        {/* NEWSLETTER SECTION */}
        <section className="newsletter section">
          <div className="newsletter__container bd-grid">
            <div>
              <h3 className="newsletter__title">Subscribe And Get <br /> 10% OFF</h3>
              <p className="newsletter__description">Get 10% discount on your next purchase</p>
            </div>

            <form action="" className="newsletter__subscribe">
              <input type="email" placeholder="Enter your email" className="newsletter__input" />
              <a href="#" className="button">Subscribe</a>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section">
        <div className="footer__container bd-grid">
          <div className="footer__box">
            <h3 className="footer__title">Luxe & Lynx</h3>
            <p className="footer__description">New collection of shoes 2024</p>
          </div>

          <div className="footer__box">
            <h3 className="footer__title">Explore</h3>
            <ul>
              <li><a href="#home" className="footer__link">Home</a></li>
              <li><a href="#featured" className="footer__link">Featured</a></li>
              <li><a href="#women" className="footer__link">Women</a></li>
              <li><a href="#new" className="footer__link">New</a></li>
            </ul>
          </div>

          <div className="footer__box">
            <h3 className="footer__title">Support</h3>
            <ul>
              <li><a href="#" className="footer__link">Product Help</a></li>
              <li><a href="#" className="footer__link">Customer Care</a></li>
              <li><a href="#" className="footer__link">Authorized Service</a></li>
            </ul>
          </div>

          <div className="footer__box">
            <div className="footer__social">
              <a href="#" className="footer__social-link"><i className="bx bxl-facebook"></i></a>
              <a href="#" className="footer__social-link"><i className="bx bxl-instagram"></i></a>
              <a href="#" className="footer__social-link"><i className="bx bxl-twitter"></i></a>
              <a href="#" className="footer__social-link"><i className="bx bxl-google"></i></a>
            </div>
          </div>
        </div>

        <p className="footer__copy">&#169; 2024 Luxe&Lynx. All rights reserved</p>
      </footer>
    </>
  );
}

export default App;
