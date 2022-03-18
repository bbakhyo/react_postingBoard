var express = require('express');
var router = express.Router();
var db = require('../db');

/* posts list */
router.get('/', function(req, res, next) {
    var page = req.query.page;
    var start = (page-1)*5;
    var count = 0;

    //전체 게시글 수
    var sql = 'select count(*) count from tbl_post'
    db.get().query(sql, function(err, rows){
        count = rows[0].count;

        //게시글 목록
        var sql = 'select *, date_format(createDate, "%Y-%m-%d %T") date from tbl_post order by id desc limit ?, 5';
        db.get().query(sql,[start], function(err, rows){
        res.send({count:count, rows:rows});
      })
    })
  
});

/* post insert */
router.post('/insert', function(req, res){
  var title = req.body.title;
  var body = req.body.body;
  var userid = req.body.userid;
  //console.log(`${title} \n ${body} ${userid}`)
  var sql = 'insert into tbl_post(title, body, userid) values(?,?,?)';
  db.get().query(sql, [title, body, userid], function(err, rows){
    res.sendStatus(200);
  })
})

/* post read */
router.get('/:id', function(req, res){
  var id = req.params.id;
  var sql = 'select *, date_format(createDate, "%Y-%m-%d %T") date from tbl_post where id=?';
  db.get().query(sql, [id], function(err,rows){
    res.send(rows[0]);
  })
})

/* post update */
router.post('/update', function(req, res){
  var id = req.body.id;
  var title = req.body.title;
  var body = req.body.body;

  var sql = 'update tbl_post set title=?, body=? where id=?';
  db.get().query(sql, [title, body, id], function(err, rows){
    res.sendStatus(200);
  })

})

/* post delete */
router.post('/delete', function(req, res){
  var id = req.body.id;

  var sql = 'delete from tbl_post where id=?';
  db.get().query(sql, [id], function(err, rows){
    res.sendStatus(200);
  })
})

module.exports = router;
