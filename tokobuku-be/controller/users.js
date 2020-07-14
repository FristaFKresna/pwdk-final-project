const db = require('./../database/mysql')


const getUserDetailById = (req,res) => {
    let id = req.params.id_user
    let sql = `select u.id, u.username, u.email, u.role, u.isVerified, 
    ud.fullname, ud.phone_number, ud.address, ud.kelurahan, 
    ud.kecamatan, ud.kota, ud.provinsi, ud.url_profile_image from users u
    left join user_detail ud on u.id = ud.users_id where u.id = ?;`

    db.query(sql, id, (err, result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })

}


const postUserProfileDetail = (req,res) => {
    let data = req.body
    let sql = 'insert into user_detail set ?'

    db.query(sql, data, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Post New User Detail Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}



const editUserDetail = (req,res) => {
    let id = req.params.id_user
    let data = req.body
    let sql = 'update user_detail set ? where users_id = ?'

    db.query(sql, [data,id], (err, result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Update User Detail Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })


}

module.exports = {
    getUserDetailById,
    postUserProfileDetail,
    editUserDetail
}