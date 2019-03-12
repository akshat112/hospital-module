var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var express = require("express");
var router = express.Router();
var app = new express();
var bodyParser = require("body-parser");
var url = "mongodb://localhost:27017/";
var fs = require("fs");

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'doctors.csv',
    header: [
        {id: 'doctor_id', title: 'doctor_id'},
        {id: 'doctor_name', title: 'doctor_name'},
        {id: 'specialization', title: 'specialization'},
        {id: 'free_from', title: 'free_from'},
        {id: 'free_to', title: 'doctor_to'},
        {id: 'hosp_id', title: 'hosp_id'}
    ]
});

// var csvdb = require('fast-csv');
// var ws = fs.createWriteStream('doctors.csv');
// var csvStream = csvdb.format({headers: true})

// ws.on("finish", function(){
//     console.log("DONE!");
//   });
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

router.all("/",function(request,response)
{
    var received = request.body;
    console.log(received);
    var obj= {hospital_name:received.hname,h_address:received.address,h_phone:received.pno,h_id:received.id,password:received.pwd};
    //console.log(obj);
    
    mongoClient.connect(url,function(err,db)
    {
        if(err) throw err;

        var dbo = db.db("devsoc");
        var obj = {doctor_id:received.id,doctor_name:received.name,specialization:received.specialization,free_from:received.fromtime,free_to:received.totime,hosp_id:received.hospid};
        if(received.id!=null){
            // csvStream.pipe(ws);
            // csvStream.write(obj);
            // csvStream.end();
            // csvdb
            //     .write([obj], {headers: true})
            //     .pipe(ws);
            // csvdb
            // .writeToStream(fs.createWriteStream("doctors.csv"), [obj], {headers: false});

            csvWriter.writeRecords([obj])       // returns a promise
                .then(() => {
                    console.log('...Done');
                });

            dbo.collection("doctorsdata").insertOne(obj,function(err,res)
            
        {
            

            if(err) throw err;
           // console.log(res);
            dbo.collection("doctorsdata").find({ doctor_id: { $exists: true, $ne : null } }).toArray(function(err,res)
            {
                if(err) throw err;
                var obj =res;
               // console.log(obj);
                response.render("hospital_add_remove.ejs",{data:obj,hospid:{id:received.hospid}});
            });
        });
        }
        else{
            dbo.collection("doctorsdata").find({ doctor_id: { $exists: true, $ne : null } }).toArray(function(err,res)
            {
                if(err) throw err;
                var obj =res;
               // console.log(obj);
                response.render("hospital_add_remove.ejs",{data:obj,hospid:{id:received.hospid}});
            });
        }
    });
});

module.exports = router;