const express = require('express');
const ejs = require('ejs');
const readline = require('readline');
const cp = require('child_process');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    res.render("index");
});

app.post("/", function(req, res){
    let lang = req.body.lang;
    let code = req.body.code;

    
    code = code.replace(/(\r\n|\n|\r)/gm, "\\n");
    code = code.replace(/"/gm, '\\"');
    // console.log(code);

    if (lang == "CPP14") {

        let comm = "printf \"" + code + "\" >" + __dirname + "/a.cpp";

        cp.exec(comm, function(err, out, serr){
            if (err) {
                console.log(err);
            } else if (serr) {
                console.log(serr);
            } else {
                console.log(out);
                
                //now executing the program present in a.cpp
                cp.exec("g++ " + __dirname +  "/a.cpp -o a.exe&a.exe", function(error, stdout, stderr){
                    if (error) {
                        console.log(error);
                    } else if (stderr) {
                        res.send(stderr);
                    } else {
                        console.log(stdout);
                        res.send(stdout);
                    }
                });
            }
        });
    } 
    else if (lang == "Python3") {

        let comm = "printf \"" + code + "\" >" + __dirname + "/a.py";

        cp.exec(comm, function(err, out, serr){
            if (err) {
                console.log(err);
            } else if (serr) {
                console.log(serr);
            } else {
                console.log(out);
                
                //now executing the program present in a.py
                cp.exec("python " + __dirname +  "/a.py", function(error, stdout, stderr){
                    if (error) {
                        console.log(error);
                    } else if (stderr) {
                        res.send(stderr);
                    } else {
                        res.send(stdout);
                    }
                });
            }
        });
    }
    else {
        let comm = "printf \"" + code + "\" >" + __dirname + "/a.java";

        cp.exec(comm, function(err, out, serr){
            if (err) {
                console.log(err);
            } else if (serr) {
                console.log(serr);
            } else {
                console.log(out);
                
                //now executing the program present in a.py
                cp.exec("javac " + __dirname +  "/a.java & java Main", function(error, stdout, stderr){
                    if (error) {
                        console.log(error);
                    } else if (stderr) {
                        res.send(stderr);
                    } else {
                        res.send(stdout);
                    }
                });
            }
        });
    }
});

app.listen(3000, function(){
    console.log("Server started on port 3000!!");
});