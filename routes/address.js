var express = require('express');
var router = express.Router();
var db = require('../db');

/* address list */
router.get('/list', function(req, res, next) {
  var count = 0;
  var page = req.query.page;
  var start = (page-1)*5;
  var sql = 'select count(*) count from address';
  db.get().query(sql, function(err, rows){
    count = rows[0].count;

    var sql = 'select * from address order by id desc limit ?, 5';
    db.get().query(sql, [start], function(err,rows){
      res.send({count:count, rows:rows});
    });
  });
 
});

/* address insert */

router.post('/insert', function(req, res){
  var name = req.body.name;
  var tel = req.body.tel;
  var address = req.body.address;
  var sql = 'insert into address(name, tel, address) values(?,?,?)';
  db.get().query(sql, [name, tel, address], function(err,rows){
    res.sendStatus(200);
  })
});

/* address delete */
router.post('/delete', function(req, res){
  var id = req.body.id;
  var sql = 'delete from address where id=?';
  db.get().query(sql, [id], function(err, rows){
    res.sendStatus(200);
  })
})

/* address read */
router.get('/read/:id', function(req, res){
  var id = req.params.id;
  var sql = 'select * from address where id=?';
  db.get().query(sql, [id], function(err, rows){
    res.send(rows[0]);
  })

});

/* address update */
router.post('/update', function(req, res){
  var id = req.body.id;
  var name = req.body.name;
  var tel = req.body.tel;
  var address = req.body.address;

  var sql = 'update address set name=?, tel=?, address=? where id=?';
  db.get().query(sql, [name, tel, address, id], function(err, rows){
    res.sendStatus(200);
  })
})
module.exports = router;
