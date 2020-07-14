const db = require('./../database/mysql')


const getDataPublishers = (req,res) => {
    let sql = 'select * from publishers;'

    db.query(sql, (err,result) => {
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


const postNewPublisher = (req,res) => {
    let data = req.body
    let sql = 'insert into publishers set ?'

    db.query(sql, data, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Post New Publishers Success!'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const getPublisherFiltered = (req,res) => {
    const name = req.query.name
    let sql = 'select * from publishers where name = ?'

    db.query(sql, name, (err,result) => {
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


module.exports = {
    getDataPublishers,
    postNewPublisher,
    getPublisherFiltered
}