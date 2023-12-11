import React from 'react';
import { useContextGlobal } from '../Components/utils/global.context';
import style from './Style/Profile.module.css';

const Profile = () => {
    const { state } = useContextGlobal();
    console.log(state.user.id)
    return (
        <div className={style.container}>
            <h2>Perfil de Usuario</h2>
            <div className={style.profileInfo}>
                <p><strong>Nombre:</strong> {state.user.name}</p>
                <p><strong>Apellido:</strong> {state.user.surname}</p>
                <p><strong>Email:</strong> {state.user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
