
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Admin = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Mobi|Android/i.test(userAgent));
  }, []);

  return (
    <>
      {isMobile ? (
        <div style={{ background: 'yellow', padding: '10px', marginBottom: '10px' }}>
          ¡Advertencia! Estás accediendo desde un dispositivo móvil.
        </div>
      ) : (
      <div>
      <h1>Panel de administrador</h1>

      <Link to='/admin/list'><button>Lista de productos</button></Link>
      <Link to='/admin/addProduct'><button>Agregar productos</button></Link>
      <p>Para hacer espacio...</p>
      </div>
      )}
    </>
  );
};

export default Admin;
