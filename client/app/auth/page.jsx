'use client'
import './page.scss'
import { useState } from 'react';
import axios from 'axios';


const AuthPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        password: "",
        secretWord: ""
    })

    const onSubmitData = () => {
        
    }

    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__container__header">
                    <div className="header__company-logo">URTK Avialines</div>
                    <div className="header__container-name">Вход</div>
                </div>

                <form className='auth__form' onSubmit={onSubmitData}>
                    <div className="auth__form__item">
                        <div className="item__title">Ваше ФИО</div>
                        <input 
                            type="text" 
                            className="item__input"
                            placeholder='Иванов Иван Иванович'
                            value={formData.fullName} 
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        
                    </div>
                    <div className="auth__form__item">
                        <div className="item__title">Ваш пароль</div>
                        <input 
                            type="password" 
                            className="item__input"
                            placeholder='Пароль' 
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <div className="auth__form__item">
                        <div className="item__title">Секретное слово</div>
                        <input 
                            type="password" 
                            className="item__input"
                            placeholder='Секретное слово'
                            value={formData.secretWord} 
                            onChange={(e) => setFormData({ ...formData, secretWord: e.target.value })}
                        />
                    </div>

                    <button className='send-data-button'>Войти</button>
                </form>
            </div>
        </div>
    )
}


export default AuthPage;