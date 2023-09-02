require('dotenv').config()
const express = require('express')
const app = express()
var db = require("./database.js")
var db1=require("./db.js")
var md5 = require('md5')
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () =>
console.log(`Server is listening on port ${port}...`)
);
/********************************** */


app.get("/", (req, res) => {
    res.send("app is ready ")
});
app.get("/api/users", (req, res, next) => {
    var sql = "select * from user"
    var params = []
    /******db.all(sql, params, callback) is a SQLite 
     * command to 
     * retrieve all rows from a SQL query**** */
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
/**********
 *we use SQL parameter binding to fill 
 the original query (this is mandatory 
    to prevent SQL injection). Each '?'symbol 
    in the sql query is mapped to an item in 
    the params array
 */
app.get('/api/user/:id',(req,res,next)=>{
    var sql="select * from user where id = ?"
    var params=[req.params.id]
    db.get(sql,params,(err,row)=>{
        if(err){
            res.status(400).json({"error":err.message})
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    })
});

app.post("/api/user/", (req, res, next) => {
    var errors=[]
    // verifications 
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    // inserting the user
    /**********
        We call db.run(sql, params, callback) with the 
        INSERT statement as sql, and the user fields 
        to save as params.The callback will check if 
        there was any error (err != null).
        If everything is OK, we return a JSON response 
        with a message, the data inserted and the new id,
        automatically created for the user (this.lastID). 
        This ID is useful if you need to retrieve 
        the user after creating.
    ******/
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

/************** */

app.patch("/api/user/:id", (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : req.body.password ? md5(req.body.password) : null
    }
    db.run(
        `UPDATE user set 
           name = COALESCE(?,name), 
           email = COALESCE(?,email), 
           password = COALESCE(?,password) 
           WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})
app.delete("/api/user/:id", (req, res, next) => {
    db.run(
        'DELETE FROM user WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
}) 
