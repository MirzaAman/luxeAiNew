import React, { useState } from 'react'


function AdminProducts() {

    const [Class, setClass] = useState('form1');

    const handleAddProduct = () => {
        if (Class === 'form1 show') {
            setClass('form1');
        } else {
            setClass('form1 show');
        }
    }

    const [data,setData] = useState([
        { title: 'Nike Jordan', price: '$149.99', img: '../../assets/img/featured1.png', status: 'Sale' },
        { title: 'Nike Jordan', price: '$149.99', img: '../../assets/img/featured2.png', status: '0 Stock' },
        { title: 'Nike Jordan', price: '$149.99', img: '../../assets/img/featured3.png', status: 'Sale' },
    ])

    const [Title,setTitle] = useState('');
    const [Price,setPrice] = useState('');
    const [Status,setStatus] = useState('');
    const [Description,setDescription] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();

        const newData = {
            title: Title,
            price: Price,
            img: '../../assets/img/featured1.png',  
            status: Status,
        }

        // data.push(newData);
        setData([...data, newData])
        console.log(data);
        
    }

    return (
        <section className="featured section" id="featured">
            <h2 className="section-title" >Add <i class='bx bx-plus-circle' style={{ cursor: 'pointer' }} onClick={handleAddProduct} ></i></h2>

            <div className={Class}>
                <form className='form' >
                    <input type="text" value={Title} onChange={(e)=>setTitle(e.target.value)} placeholder='Title' required />
                    <input type="text" value={Description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description' required />
                    <input type="text" value={Status} onChange={(e)=>setStatus(e.target.value)} placeholder='Status' required />
                    <input type="number" value={Price} onChange={(e)=>setPrice(e.target.value)} placeholder='Price' required />
                    {/* <input type="file" required /> */}
                    <button type="submit" onClick={(e)=>handleAdd(e)} >Add Product</button>
                </form>
            </div>

            <div className="featured__container bd-grid">
                {
                    data.map((item, index) => {
                        return (
                            <article className="sneaker">
                                <div className="sneaker__sale">{item.status}</div>
                                <img src={item.img} alt="" className="sneaker__img" />
                                <span className="sneaker__name">{item.title}</span>
                                <span className="sneaker__preci">{item.price}</span>
                                <a href="" className="button-light">Edit <i className="bx bx-right-arrow-alt button-icon"></i></a>
                            </article>
                        );
                    })
                }
            </div>
        </section>
    )
}

export default AdminProducts