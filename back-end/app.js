var express = require("express")
const fs = require('fs-extra')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk')

var app = express();

// cassandra
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['cassandra:9042'], localDataCenter: 'local-dc', keyspace: 'test_table'});

// aws

// AWS S3
s3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: ''
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// put in db
app.get("/url", (req, res, next) => {
    // query
    var emp_id = req.query.id;
    var emp_name = req.query.name;
    var emp_city = req.query.city;
    console.log(emp_id + ' ' +emp_name + ' ' +emp_city)

    var query = 'INSERT INTO emp (emp_id, emp_name, emp_city) VALUES(?,?, ?)';
    client.execute(query,[ emp_id,emp_name,emp_city ], { prepare : true }, function(err, result) {
        console.log('result' + JSON.stringify(result));
        console.log('err ' + err);
      });
    res.send('ok');
    console.log('ok')

  

});

// get respone from db
app.post("/vivek", (req, res) => {
    // body
    var key = req.body.id;
    console.log('key ' + key);
    var query = 'SELECT emp_city FROM emp WHERE emp_id=?';
    client.execute(query,[ key ], { prepare : true }, function(err, result) {
        console.log('result' + JSON.stringify(result));
        console.log('err ' + err);
      });
    res.send('ok');

});

// upload image to aws s3
app.post("/upload", function (req, res) {
  const folder = 'viveksairamagiri' ;
  // const localImage = '/profile_pic.png'
  const file = req.body.imageUpload;
  const bucketName = 'awsnodejs';
  const fileContent = fs.readFileSync('./'  + file);

  const params = {
    Bucket: bucketName,
    Key: (folder ),
    // ACL: 'public-read',
    Body: fileContent,
  };
  console.log("Folder vivek name: " + folder);
  console.log("File: " + file);
  

  s3.upload(params, function (err, data) {
    if (err) {
      console.log("Error: ", err);
    } else {
      console.log(data);
      res.send('ok');

    }
  });
  console.log("DONE File: " + file);
});

app.listen(3000,() => {
  console.log('Server running on 3000');
});