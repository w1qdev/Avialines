import AdminActions from "../models/AdminActions.js";

const saveAdminActions = async (adminFullName, action, time) => {
    const newAdminAction = new AdminActions({
        fullName: adminFullName,
        action,
        time,
    })

    await newAdminAction.save()
}   

export default saveAdminActions;