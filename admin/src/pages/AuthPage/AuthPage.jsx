import './AuthPage.scss'
import { useState } from 'react';
import { endpoints } from '../../api';
import axios from 'axios';
import { toastError } from '../../utils/toasts';
import { CircularProgress  } from '@chakra-ui/react'



export default function AuthPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        password: "",
        secretWord: ""
    })
    const [isFetching, setIsFetching] = useState(false)

    const submitAllData = (e) => {
        e.preventDefault()

        if (formData.fullName && formData.password && formData.secretWord) {
            setIsFetching(prev => !prev)
            axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS_ROUTE}${endpoints.ADMIN_LOGIN}`,
            { ...formData }
            )
            .then(res => {
                if (res.data.adminData.token) {
                    localStorage.setItem('token', res.data.adminData.token)
                    localStorage.setItem('admin-type', res.data.adminData.role)

                }
                setIsFetching(prev => !prev)
                window.location = "/panel"
            })
            .catch(() => {
                toastError("Похоже введеные вами данные оказались не верными")
                setIsFetching(prev => !prev)
            })
        } else {
            toastError("Кажется, Вы что-то не заполнили")
        }
    }

    return (
        <div className="auth">
            <div className="auth__container">
                <div className="auth__container__header">
                    <div className="header__company-logo">URTK Avialines</div>
                    <div className="header__container-name">Вход</div>
                </div>

                <form className='auth__form'>
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

                    <button 
                        className='send-data-button' 
                        onClick={(e) => submitAllData(e)}
                        type='submit'
                        >Войти
                    </button>
                </form>

                <div className="auth__progress" style={ isFetching ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }}>
                    <CircularProgress isIndeterminate color="green.300" />
                </div>
            </div>
        </div>
    )
}
