import './AirportsPage.scss'

const AirportsPage = () => {
    return (
        <div className="dashboard">
            <div className="dashboard__container">
                <div className="dashboard__container__header">
                    <div className="header__title">
                        <div className='title'>Аэрапорты</div>
                    </div>
                    <div className="search" style={{ width: "60%" }}>
                        <input type="text" placeholder='Поиск аэрапорта (id)' />
                    </div>
                    <button className="create-new-button">Добавить аэрапорт</button>
                </div>
                <div className="dashboard__container__body">
                    <div className="body__table-head">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AirportsPage;