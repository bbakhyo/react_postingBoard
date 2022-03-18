var express = require('express');
var router = express.Router();
var db = require('../db');

/* login check */
router.get('/:userid', function(req, res, next) {
  var userid = req.params.userid;

  var sql = 'select * from tbl_user where userid=?';
  db.get().query(sql, [userid], function(err, rows){
    res.send(rows[0]);
  })
});

/* id overlap check */
router.get('/check/:userid', function(req, res){
  var userid = req.params.userid;
  var check = 0;

  var sql = 'select * from tbl_user where userid=?';
  db.get().query(sql, [userid], function(err, rows){
    if(rows.length == 1){
      check=1;
      res.send({check:check});
    }else{
      res.send({check:check});
    }
  })
})

/* user input */
router.post('/insert', function(req, res){
  var userid = req.body.userid;
  var password = req.body.pass;
  var username = req.body.username;
  var sql = 'insert into tbl_user(userid, password, username) values (?,?,?)';

  db.get().query(sql, [userid, password, username], function(err, rows){
    res.sendStatus(200);
  })
})

module.exports = router;

