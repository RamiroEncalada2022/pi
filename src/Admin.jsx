import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Pages/Style/Admin.module.css';

const Admin = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Mobi|Android/i.test(userAgent));
  }, []);

  return (
    <>
      {isMobile ? (
        <div className={style.warning}>
          ¡Advertencia! Estás accediendo desde un dispositivo móvil.
        </div>
      ) : (
        <div className={style.effectGlass}>
          <div className={style.container}>
            <div className={style.title}>
              <h2 className={style.subtitulo}>Panel de administrador</h2>
            </div>

            <div className={style.buttonContainer}>
            <Link to='/admin/list' className={`${style.button} ${style.firstButton}`}>
                Lista de productos
              </Link>

              <Link to='/admin/addProduct' className={`${style.button} ${style.secondButton}`}>
                Agregar productos
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
