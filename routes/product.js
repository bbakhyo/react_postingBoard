var express = require('express');
var router = express.Router();
var db = require('../db');

/* product list */
router.get('/list', function(req, res, next) {
  var count = 0;
  var page = req.query.page;
  var start = (page-1)*5;
  var sql = 'select count(*) count from product';
  db.get().query(sql, function(err, rows){
    count = rows[0].count;

    var sql = 'select *, format(price,0) fprice, date_format(regdate, "%Y-%m-%d") date from product order by id desc limit ?, 5';
    db.get().query(sql, [start], function(err,rows){
      res.send({count:count, rows:rows});
    });
  });
 
});

module.exports = router;
