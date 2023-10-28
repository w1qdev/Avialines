import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminActionsItem from '../../components/Panel/AdminActionsItem/AdminActionsItem'
import './PanelPage.scss'
import { endpoints } from '../../api'
import { toastError } from '../../utils/toasts'
import MoreAdminActions from '../../components/Popups/MoreAdminActions'


export default function PanelPage() {

    const [lastAdminActions, setLastAdminActions] = useState([])
    const [moreAdminActionsPopup, setMoreAdminActionsPopup] = useState(false)

    const popupHandler = () => setMoreAdminActionsPopup(!moreAdminActionsPopup)

    useEffect(() => {
        axios.get(`${endpoints.SERVER_ORIGIN_URI}${endpoints.ADMINS.ROUTE}${endpoints.ADMINS.ACTIONS}`)
        .then(res => {
            setLastAdminActions(res.data.body.reverse().slice(0, 3))
        })
        .catch(err => {
            toastError("Что-то пошло не так, не удалось поулчить список последний действий администрации")
        })
    }, [])


    return (
        <>
            {moreAdminActionsPopup ? (
                <MoreAdminActions 
                    title="Все последние действия администрации" 
                    popupHandler={popupHandler}
                />
            ) : null}

            <motion.div 
                className="dashboard"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
            >
                <div className="panel__inner">
                    <div className="panel__inner__item item-1">
                        <div className="item__header">
                            <div className="item__header__title">Общая информация</div>
                        </div>

                        <div className="item__calculated-info">
                            <div className="info__item">
                                <div className="info__item__number">234</div>
                                <div className="info__item__description">Рейсов за день</div>
                            </div>
                            <div className="info__item">
                                <div className="info__item__number">234</div>
                                <div className="info__item__description">Новых пассажиров за день</div>
                            </div>
                            <div className="info__item">
                                <div className="info__item__number">234</div>
                                <div className="info__item__description">Общее число рейсов</div>
                            </div>
                            <div className="info__item">
                                <div className="info__item__number">234</div>
                                <div className="info__item__description">Общее число рейсов</div>
                            </div>
                        </div>

                    </div>

                    <div className="panel__inner__item item-2">
                        <div className="item__header">
                            <div className="item__header__title">Вспомогательная информация</div>
                        </div>
                    </div>

                    <div className="panel__inner__item item-3">
                        <div className="item">

                            <div className="item__header">
                                <div className="item__header__title">Последние действия администрации</div>
                            </div>

                            <div className="item__content__list">

                                {lastAdminActions.length ? lastAdminActions.map(action => (
                                    <AdminActionsItem key={action.id} {...action} />
                                )) : (
                                    <div className="no-admin-actions">
                                        Ничего не найдено 😔
                                    </div>
                                )}

                                {lastAdminActions.length ? (
                                    <div 
                                        className='list__see-more'
                                        onClick={popupHandler}
                                    >
                                        <motion.button 
                                            className='button'
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Больше действий
                                        </motion.button>
                                    </div>
                                ) : null}
                                
                            </div>

                            <div className="vertical-separator"></div>
                        </div>
                        <div className="item">
                            <div className="item__header">
                                <div className="item__header__title">Последние действия администрации</div>
                            </div>
                        </div>
                    </div>

                    <div className="panel__inner__item item-4">
                        item 4
                    </div>
                </div>
            </motion.div>
        </>
    )
}
