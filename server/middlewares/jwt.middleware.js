import jwt from 'jsonwebtoken'


const jwtVerification = (req, res, next) => {
    // FIXME: В разработке, не работает
    try {
        if (req.headers.token) {
            // const jwtToken = req.cookies.token
            console.log(req)
            
            console.log("jwt verification")

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

            console.log("jwt is verified successfuly")
            next()
        } else {
            return res.send({
                error: "Токен авторизации истек", 
                isRemoveAdminData: true
            })
        }        
    } catch (err) {
        console.log(err)
    }
    
}

export default jwtVerification