import './PlanesPage.scss'

const PlanesPage = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <div className="sections">
                        <div className='button'>Самолеты</div>
                        <div className='button'>placeholder</div>
                    </div>
                    <div className="search">
                        <input type="text" placeholder='Поиск билета (id, имя пассажира, данные паспорта)' />
                    </div>
                    <button className="create-new-button">Добавить самолет</button>
                </div>
                <div className="dashboard__container__body">
                    <div className="body__table-head">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanesPage;