import './AuthPage.scss'
import { useState } from 'react';
import { endpoints } from '../../api/index.js';
import axios from 'axios';
import { toastError } from '../../utils/toasts';
import CircularProgressItem from '../../components/CircularProgress/CircularProgressItem';
import { motion } from 'framer-motion'


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
            axios.post(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.LOGIN}`,
            { ...formData }
            )
            .then(res => {
                if (res.data.adminData.token) {
                    localStorage.setItem('token', res.data.adminData.token)
                    localStorage.setItem('admin-type', res.data.adminData.role)
                    localStorage.setItem('fullName', res.data.adminData.fullName)
                }
                setIsFetching(prev => !prev)
                window.location = "/register-passenger"
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
            <motion.div 
                className="auth__container"
                // framer-motion
                initial={{ y: 50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.3 }} 
            >
                <div className="auth__container__header">
                    <div className="header__company-logo">URTK Airlines</div>
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

                    <motion.button 
                        className='send-data-button' 
                        onClick={(e) => submitAllData(e)}
                        type='submit'
                        // framer-motion
                        whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.99 }}
                        >Войти
                    </motion.button>
                </form>

                <CircularProgressItem isFetching={isFetching} />
            </motion.div>
        </div>
    )
}
