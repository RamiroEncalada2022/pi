import React, { useState, useEffect, useRef } from "react";
import styles from "../Style/AddProduct.module.css";

const CategoriaMenu = () => {
  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  const categorias = [ "Cuerda", "Percusion", "Viento", "Otros"]

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="menu-container" ref={menuRef}>
      
      <div className="menu-trigger" onClick={() => { setOpen(!open); }}>
        <input className={styles.text} type="text" placeholder="Categoría del producto"/>
      </div>

      <div className={`${open ? `${styles.dropdownmenuactive}` : styles.dropdownmenuinactive}`}>
        <ul>
        {categorias.map(categoria =><DropdownItem key = {id} text={"My Profile"}/> )}        
        </ul>
      </div>


    </div>
  );
};

function DropdownItem(props) {
  return (
    <li className="dropdownItem">
      <a> {props.text} </a>
    </li>
  );
}

export default CategoriaMenu;
