

const AdminActionsItem = ({ fullName, action, time }) => {
    return (
        <div className="list__item">
            <div className="list__item__author">{fullName}</div>
            <div className="list__item__action">{action}</div>
            <div className="list__item__time">{time}</div>
        </div>
    )
}

export default AdminActionsItem