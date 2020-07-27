const db = require('./../database/mysql');
const passwordHasher = require('./../helpers/hashing');
const { createJwt } = require('../helpers/jwt');
const transporter = require('./../helpers/nodemailerTransporter');


const register = (req,res) => {
    const data = req.body

    const input = {
        username : data.username,
        email : data.email,
        password : data.password,
        role : data.username.includes('admin') ? 'admin' : 'user',  //di front end reactjs gaboleh input username yang includes admin, cuma di web admin bisanya
        isVerified : data.username.includes('admin') ? 1 : 0,
        otp : data.username.includes('admin') ? 0 : data.otp  
    }

    const sqlUsernameCheck = 'select * from users where username = ?'
    db.query(sqlUsernameCheck, data.username, (err,result)=>{
        try{
            if(err) throw err
            if(result.length > 0 ){
                res.json({
                    error : true,
                    message : 'username has been taken'
                })
            }else{
                const sqlEmailCheck = 'select * from users where email = ?'
                db.query(sqlEmailCheck, data.email, (err,result) => {
                    try{
                        if(err) throw err
                        if(result.length > 0){
                            res.json({
                                error : true,
                                message : 'email has been taken'
                            })
                        }else{
                            const afterHashing = passwordHasher(input.password)
                            input.password = afterHashing

                            const sqlInsert = 'insert into users set ?'
                            db.query(sqlInsert, input, (err, result)=>{
                                try{
                                    if(err) throw err

                                    //SETTING EMAIL VERIFICATION WITH OTP BELUM BERES
                                    if(input.isVerified === 0){
                                        transporter.sendMail({
                                            from : "TokoBuku",
                                            to : data.email,
                                            subject : "<TokoBuku> Verify Your Email Now! <TokoBuku>",
                                            html : `
                                            <h2>Thanks for signing up! Here is your verification code : ${input.otp} <h2>
                                            `
                                        }).then((response)=>{

                                            const token = createJwt({id : result.insertId, username : input.username, email : input.email, role : input.role})

                                            res.json({
                                                error : false,
                                                message : "Register Success, Check your Email to Verify",
                                                data : {id : result.insertId, username : input.username, email : input.email},
                                                token : token
                                            })
                                        })
                                        .catch((err)=>{
                                            console.log(err)
                                        })
                                    }else{
                                        res.json({
                                            error :false,
                                            message : 'Register User Admin Success!'
                                        })
                                    }
                                }catch(err){
                                    res.json({
                                        error : true,
                                        message : err.message
                                    })
                                }
                            })
                        }
                    }catch(err){
                        res.json({
                            error : true,
                            message : err.message
                        })
                    }
                })
            }
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const verify = (req,res) => {

    // const token = req.params.token
    // const dataToken = decodedToken(token)
    // console.log(dataToken)

    const data = req.body

    let sql = 'select * from users where email = ?'
    db.query(sql, data.email, (err, result)=>{
        try{
            if(err) throw err

            if(Number(data.otp) === Number(result[0].otp)){
                let sqlUpdate = 'update users set isVerified = 1 where email = ?;'
                db.query(sqlUpdate, [data.email], (err, result)=>{
                    try{
                        if(err) throw err
                        res.json({
                            error : false,
                            message : "verify success"
                        })
            
                    }catch(err){
                        res.json({
                            error : true, 
                            message : err.message
                        })
                    }
                })
            }else{
                res.json({
                    error : true,
                    message : 'code did not match, please resend the code'
                })
            }

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const resendOtp = (req,res) => {
    const data = req.body
    console.log(data)

    let sql = 'update users set otp = ? where email = ?'
    db.query(sql, [data.otp, data.email], (err,result)=>{
        try{
            if(err) throw err
            

            transporter.sendMail({
                from : "TokoBuku",
                to : data.email,
                subject : "<TokoBuku> Verify Your Email Now! <TokoBuku>",
                html : `
                <h2>Thanks for signing up! Here is your verification code : ${data.otp} <h2>
                `
            }).then((response)=>{
                res.json({
                    error : false,
                    message : "Resend New Code Success, Check Your Email"
                })
            })
            .catch((err)=>{
                console.log(err)
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const login = (req,res) => {
    const data = req.body
    const afterHashing = passwordHasher(data.password)
    data.password = afterHashing
    let sql = 'select * from users where email = ? and password = ?'
    db.query(sql, [data.email, data.password], (err, result)=>{
        try{
            if(err) throw err
            if(result.length === 0) throw {error : true, message : 'email or password invalid'}
            // if(result[0].isVerified === 0) throw {error : true, message : 'Please Verify Your Email'}

            const dataUser = result[0]
            const token = createJwt({id : dataUser.id, username : dataUser.username, email : dataUser.email, role : dataUser.role})

            res.json({
                error : false,
                message : 'Login Success',
                data : {id : dataUser.id, username : dataUser.username, email : dataUser.email, role : dataUser.role},
                token : token
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const forgetPassword = (req,res) => {

    const data = req.body                                            //INPUT EMAIL ATAU USERNAME DULU

    const sqlEmailCheck = 'select * from users where email = ?'
    db.query(sqlEmailCheck, data.email, (err,result)=>{
        try{
            if(err) throw err
            if(result.length === 0 ) throw {error : true, message : 'email not available'}
            let dataUser = result

            let sql = 'update users set otp = ? where id = ? and email = ?'
            db.query(sql, [data.otp, result[0].id, data.email], (err,result)=>{
            try{
                if(err) throw err
                transporter.sendMail({
                    from : 'TokoBuku',
                    to : data.email,
                    subject : '<TokoBuku> Reset Password <TokoBuku>',
                    html : `
                    <h2>This is your code, to reset your password : ${data.otp} <h2>
                    `
                }).then((response)=>{
                    res.json({
                        error : false,
                        message : 'Check Your Email to Reset Your Password',
                        data : dataUser
                    })
                })
                .catch((err)=>{
                    console.log(err)
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const resetPassword = (req,res) => {
    // const token = req.params.token
    // const dataToken = decodedToken(token)
    const data = req.body
    const afterHashing = passwordHasher(data.password)
    data.password = afterHashing

    // console.log(dataToken)
    const sql = 'update users set ? where email = ?'
    db.query(sql, [{password:data.password}, data.email], (err,result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Reset Password Success'
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


//VERIFY, FORGET PASS, & RESET PASS BELUM FINAL

module.exports = {
    register,
    verify,
    login,
    forgetPassword,
    resetPassword,
    resetPassword,
    resendOtp,    
}
