import React, { useState } from 'react';
import { db } from '../firebase/config';
import { getDocs, collection, query, where } from 'firebase/firestore';
import Load from '../Components/Load';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

function AiScreen() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [skinTone, setSkinTone] = useState('');
    const [colorName, setColorName] = useState('');
    const [colorHex, setColorHex] = useState('');
    const [gender, setGender] = useState('');
    const [aiResult, setAiResult] = useState([]);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState('rrr');
    const [visible3, setVisible3] = useState('rrr');
    const [visible4, setVisible4] = useState('');
    const [loadingVisible, setLoadingVisible] = useState('rrr');

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
        setVisible3('');
        setVisible4('rrr');
    };

    const convertToJpeg = async (imageFile) => {
        if (imageFile.type === 'image/heic') {
            try {
                const convertedFile = await heic2any({
                    blob: imageFile,
                    toType: 'image/jpeg'
                });
                return new File([convertedFile], 'converted.jpg', { type: 'image/jpeg' });
            } catch (error) {
                console.error('Error converting HEIC image:', error);
                throw error;
            }
        }
        return imageFile;
    };

    const compressImage = async (imageFile) => {
        try {
            const jpegImage = await convertToJpeg(imageFile);

            const options = {
                maxSizeMB: 1, // Maximum file size in MB
                maxWidthOrHeight: 1024, // Maximum width or height in pixels
                useWebWorker: true, // Use Web Worker for compression
            };

            const compressedFile = await imageCompression(jpegImage, options);

            // Debugging: Log compressed file details
            console.log('Compressed File:', compressedFile);

            return compressedFile;
        } catch (error) {
            console.error('Error compressing image:', error);
            throw error;
        }
    };

    const handleSubmit = async (event) => {
        setLoadingVisible('');
        event.preventDefault();
        if (!selectedImage) return;

        try {
            const compressedImage = await compressImage(selectedImage);
            const formData = new FormData();
            formData.append('image', compressedImage);

            const response = await fetch('https://fashion-ai-backend-ou1w.onrender.com/detect_skin_tone', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            setSkinTone(data.skin_tone);
            setColorName(data.color_name);
            setColorHex(data.color_hex);
            setGender(data.gender);

            console.log(`Detected Gender: ${data.gender}`);

            setVisible3('rrr');
            setVisible4('');

            findCostumeWithAi(data.color_name, data.gender);

        } catch (error) {
            setError('Error detecting skin tone or gender. Please try again.');
            console.error('Error:', error);
            setLoadingVisible('rrr');
        }
    };

    const findCostumeWithAi = async (colorName, gender) => {
        let trail;

        switch (colorName) {
            case 'Dark Brown':
                trail = 'darkbrown';
                break;
            case 'Medium Brown':
                trail = 'mediumbrown';
                break;
            case 'Light Brown':
                trail = 'lightbrown';
                break;
            case 'Fair Skin':
                trail = 'fairskin';
                break;
            case 'Very Fair Skin':
                trail = 'veryfairskin';
                break;
            default:
                trail = '';
        }

        try {
            if (trail) {
                const costumeCollection = collection(db, trail);
                const q = query(costumeCollection, where("gender", "==", gender));
                const data = await getDocs(q);
                setAiResult(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                setVisible('');
                setLoadingVisible('rrr');
            } else {
                setAiResult([]);
            }
        } catch (error) {
            setError('Error fetching costumes. Please try again.');
            console.error('Error fetching costumes:', error);
            setAiResult([]);
        }
    };

    return (
        <>
            <header className="l-header" id="header">
                <nav className="nav bd-grid">
                    {/* <div className="nav__toggle" id="nav-toggle">
                        <i className="bx bxs-grid"></i>
                    </div> */}

                    {/* <a href="#" className="nav__logo">Luxe & Lynx</a> */}

                    <div id="nav-menu">
                        <ul className="nav__list">
                            <li className="nav__item">
                                {/* <a className="nav__link">Home</a> */}
                            </li>
                        </ul>
                    </div>

                    {/* <div className="nav__shop">
                        <i className="bx bx-shopping-bag badge"></i>
                        <i className="fa-solid fa-wand-sparkles"></i>
                    </div> */}
                </nav>
            </header>

            <section className="newsletter section">
                <div className="newsletter__container bd-grid">
                    <div>
                        {/* <img alt="uploaded img" src={URL.createObjectURL(selectedImage)} /> */}
                    </div>

                    <div className="newsletter__subscribe1">
                        <label htmlFor="file-upload" className={`upload-button ${visible4}`}>
                            Upload Image
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            className={`upload-input ${visible4}`}
                            onChange={handleImageChange}
                        />

                        <a onClick={handleSubmit} className={`button1 ${visible3}`} style={{ cursor: 'pointer' }}>
                            Upload
                        </a>
                    </div>
                </div>
            </section>

            <div className={loadingVisible}>
                <Load />
            </div>

            <main className={`l-main ${visible}`}>
                <section className="featured section" id="shop">
                    <h2 className="section-title">AI - Recommendations</h2>

                    <div className="featured__container bd-grid">
                        {aiResult.map((item) => (
                            <article className="sneaker" key={item.id}>
                                <div className="sneaker__sale">Sale</div>
                                <img src={item.image} className="sneaker__img" alt={item.title} />
                                <span className="sneaker__name">{item.title}</span>
                                <span className="sneaker__preci">${item.amount}</span>
                                <a className="button-light">Add to Cart <i className='bx bx-right-arrow-alt button-icon'></i></a>
                            </article>
                        ))}
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
        </>
    );
}

export default AiScreen;
