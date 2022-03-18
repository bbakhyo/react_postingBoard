var mysql = require('mysql');
var conn;

exports.connect=function() {
    conn=mysql.createPool({
        connectionLimit:100, 
        host:'localhost', 
        user:'server', 
        password:'pass', 
        database:'serverdb' });
}
exports.get=function(){
    return conn;
};