const db = require('./../database/mysql')

const getTransactionStatus = (req,res) => {
    let sql = 'select * from transaction_status;'
    db.query(sql, (err,result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error :true,
                message : err.message
            })
        }
    })
}

const updateStatus = (req,res) => {
    let data = req.body

    let sql = 'update transaction set transaction_status_id = ? where id = ?'
    db.query(sql, [data.transaction_status_id, data.id], (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'update status success'
            })
        }catch(err){
            res.json({
                error :true,
                message : err.message
            })
        }
    } )
}


const rejectStatus = (req,res) => {
    let data = req.body

    let sql = 'update transaction set transaction_status_id = ?, notes = ? where id = ?'
    db.query(sql, [data.transaction_status_id, data.notes, data.id], (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'status rejected'
            })
        }catch(err){
            res.json({
                error :true,
                message : err.message
            })
        }
    } )
}

module.exports = {
    getTransactionStatus,
    updateStatus,
    rejectStatus
}