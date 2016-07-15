var expectedResult = 9
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('kuten.js'),
    w = fs.createWriteStream('test/kuten.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/kuten.md -r json -l 100', function(err, stdout, stderr){
    if (err) throw err;
    fs.unlink('test/kuten.js',function(){
      var result = JSON.parse(stdout)
      if (result[0].errors.length !== expectedResult){
        throw new Error(result[0].errors.length + " error was occured. It is unexpected.")
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
