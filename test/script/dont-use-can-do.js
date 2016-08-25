var expectedResult = 4
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('dont-use-can-do.js'),
    w = fs.createWriteStream('test/dont-use-can-do.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/dont-use-can-do.md -r json -l 100', function(err, stdout, stderr){
    if (err) throw err;
    fs.unlink('test/dont-use-can-do.js',function(){
      var result = JSON.parse(stdout)
      if (result[0].errors.length !== expectedResult){
        throw new Error(result[0].errors.length + " error was occured. It is unexpected.")
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
