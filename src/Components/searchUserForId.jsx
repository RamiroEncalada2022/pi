import axios from 'axios';
import React from 'react'

const searchUserForId = async ( id, token ) => {
    try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:8080/api/usuarios/${id}`, config);
    
        // Verificar si la solicitud fue exitosa y devolver los datos del usuario
        if (response.status === 200) {
            console.log("Aca deberia mostrar los datos del usuario ")
            console.log(response.data)
          return response.data; // Devolver los datos del usuario en caso de éxito
        } else {
          throw new Error('No se pudo obtener los datos del usuario');
        }
      } catch (error) {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los datos del usuario:', error);
        throw new Error('Se produjo un error al obtener los datos del usuario');
      }
    };

export default searchUserForId