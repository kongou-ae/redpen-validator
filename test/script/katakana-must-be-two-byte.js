var expectedResult = 55
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('katakana-must-be-two-byte.js'),
    w = fs.createWriteStream('test/katakana-must-be-two-byte.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/katakana-must-be-two-byte.md -r json', function(err, stdout, stderr){
    fs.unlink('test/katakana-must-be-two-byte.js',function(){
      var result = JSON.parse(stdout)
      if (result[0].errors.length  != expectedResult){
        console.log(result[0].errors.length + " error was occured. It is unexpected.")
        process.exit(1);
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
