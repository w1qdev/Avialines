import TableItemCard from "./TableItemCard";


const AdminTableItemCard = ({ fullName, role, id,  }) => {

    const adminData = { id, fullName, role }

    const formatRole = role === 'mainAdmin' ? "Главный администратор" : "Администратор"

    return (
        <TableItemCard 
            data={adminData} 
            itemId={id} 
            itemCategory='admins'
        > 
            <tbody>
                <tr>
                    <td>ФИО Администратора:</td>
                    <td>{fullName}</td>
                </tr>
                <tr>
                    <td>Уровень:</td>
                    <td className={`role ${role === 'mainAdmin' ? 'main' : 'sub' }`}>{formatRole}</td>
                </tr>
            </tbody>
        </TableItemCard>
    )
}

export default AdminTableItemCard;