var expectedResult = 15;
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('symbol.js'),
    w = fs.createWriteStream('test/symbol.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/symbol.md -r json', function(err, stdout, stderr){
    fs.unlink('test/symbol.js',function(){
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
