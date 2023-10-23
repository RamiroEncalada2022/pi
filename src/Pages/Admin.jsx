import React, { useState } from 'react';
import style from './Style/Admin.module.css'

const Admin = () => {
  
  /* --------------------------- Datos hardcodeados --------------------------- */
  const [products, setProducts] = useState([
    {
      name: "Guitarra Acústica",
      description: "Una guitarra acústica de alta calidad para músicos aficionados y profesionales.",
      images: ["https://f.fcdn.app/imgs/58075c/www.palaciodelamusica.com.uy/pmusuy/79f5/webp/catalogo/0971712022-0971712022_1/2000-2000/guitarra-acustica-fender-alkaline-trio-malibu-marron-guitarra-acustica-fender-alkaline-trio-malibu-marron.jpg","https://f.fcdn.app/imgs/7e0c70/www.palaciodelamusica.com.uy/pmusuy/1392/webp/catalogo/GB1KPE-GB1KPE_1/2000-2000/piano-acustico-yamaha-gb1kpe-piano-acustico-yamaha-gb1kpe.jpg"],
    },
    {
      name: "Piano Digital",
      description: "Un piano digital con teclas ponderadas y múltiples sonidos de instrumentos incorporados.",
      images: ["https://f.fcdn.app/imgs/0caa78/www.palaciodelamusica.com.uy/pmusuy/74dc/webp/catalogo/CLP795GP-CLP795GP_1/2000-2000/piano-digital-yamaha-clp795gp-piano-digital-yamaha-clp795gp.jpg"],
    },
  ]);

  /* -------------------------------------------------------------------------- */

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const addProduct = (event) => {
    event.preventDefault();

    //nuevo producto
    const newProduct = {
      name: name,
      description: description,
      images: images,
    };
    setProducts([...products, newProduct]);

    //deja vacio  los input y  el array vacio
    setName('');
    setDescription('');
    setImages([]);
  };

  //remueve un producto de la lista
  const removeProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className={style.layout}>
      <h2>Panel de Administrador</h2>
      <form className={style.formContainer} onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Descripción del producto"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
  type="file"
  onChange={(e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  }}
  multiple
/>
        <br />
        <button type="submit">Agregar Producto</button>
      </form>
      <ul className={style.productList}>
        {products.map((product, index) => (
          <li key={index} className={style.card}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div >
              {product.images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt={`Imagen ${i + 1}`}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ))}
            </div>
            <button onClick={() => removeProduct(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
