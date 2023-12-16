import jwt from 'jsonwebtoken'


const jwtVerification = (req, res, next) => {
    // FIXME: В разработке, не работает
    try {
        const jwtToken = req.headers.token.split(' ')[1]

        if (!jwtToken) {
            return res.send({ 
                error: "Токен авторизации не найден", 
                isRemoveAdminData: true  
            })
        }

        const isJWTVerified = jwt.verify(jwtToken, process.env.JWT_SECRET)

        if (!isJWTVerified) {
            return res.send({ 
                error: "Токен авторизации истек", 
                isRemoveAdminData: true  
            })
        }

        next()
        
    } catch (err) {
        console.log(err)
    }
    
}

export default jwtVerification