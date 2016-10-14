// (function() {
//     var childProcess = require("child_process");
//     var oldSpawn = childProcess.spawn;
//     function mySpawn() {
//         console.log('spawn called');
//         console.log(arguments);
//         var result = oldSpawn.apply(this, arguments);
//         return result;
//     }
//     childProcess.spawn = mySpawn;
// })();


var express=require('express');
var app=express();
var router=express.Router();
var path=require('path');
// var router=express.Router();
var bodyPaser=require('body-parser');
var http = require('http');
var mongojs=require('mongojs');
var collections=['register'];
var rpigpio = require('rpi-gpio');
var pigpio = require('pi-gpio');
var gpio = require('gpio');
var pinrequired = 7;

// python code execution starts here
//this code takes time to execute. Try another if possible. name is python code 1
// var PythonShell = require('python-shell');

// var options = {
//   mode: 'text',
//   pythonPath: 'C:/Users/rajeev/AppData/Local/Programs/Python/Python35-32/python.exe',
//   pythonOptions: ['-u'],
// };

// PythonShell.run('test.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   console.log("finished executing python script");
//   console.log(results);
// });

//execution of python code 2 starts here. Its not tested yet.
// python code 2 starts here with comment.
// var options = {
//   mode: 'text',
//   pythonPath: 'C:\Users\rajeev\AppData\Local\Programs\Python\Python35-32',
//   pythonOptions: ['-u'],
//   scriptPath: 'F:\website\ipl5th_sem_working'
//   // args: ['value1', 'value2', 'value3']
// };

// PythonShell.run('my_script.py', options, function (err, results) {
//   if (err) throw err;
//   // results is an array consisting of messages collected during execution
//   console.log('results: %j', results);
// });


// PythonShell.run('test.py', function (err) {
//   if (err) throw err;
//   console.log('finished');
// });
//execution of python code 2 ends here.

//var spawn = require("child_process").spawn;

// // On Windows Only ...
// const spawn = require('child_process').spawn;
// const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// bat.stdout.on('data', (data) => {
//   console.log(data);
// });

// bat.stderr.on('data', (data) => {
//   console.log(data);
// });

// bat.on('exit', (code) => {
//   console.log(`Child exited with code ${code}`);
// });

// // On Windows Only ...
// const spawn = require('child_process').spawn;
// const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// bat.stdout.on('data', (data) => {
//   console.log(data);
// });

// bat.stderr.on('data', (data) => {
//   console.log(data);
// });

// bat.on('exit', (code) => {
//   console.log(`Child exited with code ${code}`);
// });

// const spawn = require('child_process').spawn;

// const child = spawn(process.argv[0], ['test.py'], {
//   detached: true,
//   stdio: 'ignore'
// });

// child.unref();

// var db = mongojs('mongodb://dev.frugaltek.com:27017/flms', ['register']);
 // var db = mongojs('mongodb://bhuvanesh:123@ds023398.mlab.com:23398/heroku_461p1j1s', collections);
var port = Number(process.env.PORT || 3000)
var session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.use('/', express.static(__dirname+'/public'));
app.listen(port,function(){
})


app.post('/glowbulbon', function(req, res)
{
  console.log("glowbulb on is called");
  console.log(req.body);
  rpigpio.setup(pinrequired, gpio.DIR_OUT, write);
 
function write() {
    rpigpio.write(pinrequired, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}

//var gpio4 = gpio.export(7, {
    // direction: "out",
     //ready: function(){
   // gpio4.set();
     //}
    //});

});
app.post('/glowbulboff', function(req, res)
{
  console.log("glowbulb off is called");
  console.log(req.body);
});
app.post('/glowfanon', function(req, res)
{
  console.log("glowfan on is called");
  console.log(req.body);
});

app.post('/glowfanoff', function(req, res)
{
  console.log("glowfan off is called");
  console.log(req.body);
});
 


