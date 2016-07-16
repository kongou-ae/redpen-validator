var expectedResult = 9
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('use-numeral-properly.js'),
    w = fs.createWriteStream('test/use-numeral-properly.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/use-numeral-properly.md -r json -l 100', function(err, stdout, stderr){
    if (err) throw err;
    fs.unlink('test/use-numeral-properly.js',function(){
      var result = JSON.parse(stdout)
      if (result[0].errors.length !== expectedResult){
        throw new Error(result[0].errors.length + " error was occured. It is unexpected.")
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
