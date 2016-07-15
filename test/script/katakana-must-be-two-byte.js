var expectedResult = 55
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('katakana-must-be-two-byte.js'),
    w = fs.createWriteStream('test/katakana-must-be-two-byte.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/katakana-must-be-two-byte.md -r json -l 100', function(err, stdout, stderr){
    if (err) throw err;
    fs.unlink('test/katakana-must-be-two-byte.js',function(){
      var result = JSON.parse(stdout)
      if (result[0].errors.length !== expectedResult){
        throw new Error(result[0].errors.length + " error was occured. It is unexpected.")
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
