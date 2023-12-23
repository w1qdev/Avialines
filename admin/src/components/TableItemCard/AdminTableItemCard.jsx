import TableItemCard from "./TableItemCard";


const AdminTableItemCard = ({ fullName, role, id,  }) => {
    // Компонент для отображения данных админа в виде карточки

    const adminData = { id, fullName, role }
    const currentAdminFullName = localStorage.getItem('fullName')

    const isMyCard = currentAdminFullName === adminData.fullName

    const formatRole = role === 'mainAdmin' ? "Главный администратор" : "Администратор"

    return (
        <TableItemCard 
            data={adminData} 
            itemId={id} 
            itemCategory='admins'
        > 
            <div className='table-item'>
                {isMyCard ? (
                    <div className="table-item__badge green">
                        Вы
                    </div>
                ) : null}

                
                <div className='table-item__category'>
                    <div className='table-item__category__title'>ФИО Администратора:</div>
                    <div className='table-item__category__info'>{fullName}</div>
                </div>
                <div className='table-item__category'>
                    <div className='table-item__category__title'>Уровень:</div>
                    <div className={`table-item__category__info role ${role === 'mainAdmin' ? 'main' : 'sub' }`}>{formatRole}</div>
                </div>
            </div>
        </TableItemCard>
    )
}

export default AdminTableItemCard;