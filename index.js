const express = require('express');
const ejs = require('ejs');
const cp = require('child_process');
const fs = require('fs');

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
    let input = req.body.input;

    fs.writeFile(__dirname + '/prog/input.txt', input, function(err){
        if (err) {
            console.log(err);
        } else {
            if (lang == "CPP14") {

                fs.writeFile(__dirname + '/prog/a.cpp', code, function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully written to a.cpp");
        
                        //now executing the program present in a.cpp
                        cp.exec("cd prog & g++ a.cpp -o a.exe & a.exe < input.txt", function(error, stdout, stderr){
                            if (error) {
                                res.send(error);
                            } else if (stderr) {
                                res.send(stderr);
                            } else {
                                res.send(stdout);
                            }
                        });
                    }
                });
            } 
            else if (lang == "Python3") {
        
                fs.writeFile(__dirname + '/prog/a.py', code, function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully written to a.py");
        
                        //now executing the program present in a.cpp
                        cp.exec("cd prog & python a.py < input.txt", function(error, stdout, stderr){
                            if (error) {
                                console.log(error);
                                res.send(error);
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
                
                fs.writeFile(__dirname + '/prog/a.java', code, function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully written to a.java");
        
                        //now executing the program present in a.py
                        cp.exec("cd prog & javac a.java & java Main < input.txt", function(error, stdout, stderr){
                            if (error) {
                                console.log(error);
                                res.send(error);
                            } else if (stderr) {
                                res.send(stderr);
                            } else {
                                res.send(stdout);
                            }
                        });
                    }
                });
            }
        }
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000!!");
});