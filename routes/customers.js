var express = require('express');
var router = express.Router();
var db = require('../db');

/* CUSTOMERS LIST */
router.get('/list', function(req, res, next) {
    var page = req.query.page;
    var start = (page -1) * 3;
    var search = '%' + req.query.search + '%';
    var count = 0;
    var sql = 'select count(*) count from customers where name like ?';
    db.get().query(sql,[search], function(err,rows){
        count = rows[0].count;

        var sql = 'select *, date_format(birthday, "%Y-%m-%d") date from customers where name like ? order by id desc limit ?,3';
        db.get().query(sql,[search, start], function(err,rows){
            res.send({rows:rows, count:count});
        })
    })
   
});

/* CUSTOMER DELETE */
router.post('/delete/:id', function(req, res){
    var id = req.params.id;

    var sql = 'update customers set isDelete=1 where id=?';
    db.get().query(sql, [id], function(err, rows){
        res.sendStatus(200);
    })
})

/* CUSTOMER RESTORE */
router.post('/restore/:id', function(req, res){
    var id = req.params.id;

    var sql = 'update customers set isDelete=0 where id=?';
    db.get().query(sql, [id], function(err, rows){
        res.sendStatus(200);
    })
})
/* CUSTOMER IMAGE UPLOAD */
var multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) =>{
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});
const upload = multer({storage});

/* CUSTOMER INSERT */
router.post('/insert',upload.single('image'), function(req, res){
    var name = req.body.name;
    var birthday = req.body.birthday;
    var gender = req.body.gender;
    var job = req.body.job;
    var image = '/images/' +  req.file.filename;

     console.log(`${name} \n${birthday}\n${gender}\n${job}\n${image}`);

    var sql = 'insert into customers(name, birthday, gender, job, image) values (?,?,?,?,?)';
    db.get().query(sql, [name, birthday, gender, job, image], function(err, rows){
        res.sendStatus(200);
    })
})
module.exports = router;
