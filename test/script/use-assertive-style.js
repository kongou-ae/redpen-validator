var expectedResult = 83
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('use-assertive-style.js'),
    w = fs.createWriteStream('test/use-assertive-style.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/use-assertive-style.md -r json -l 100', function(err, stdout, stderr){
    if (err) throw err;
    fs.unlink('test/use-assertive-style.js',function(){
      var result = JSON.parse(stdout)
      console.dir(JSON.stringify(result))
      if (result[0].errors.length !== expectedResult){
        throw new Error(result[0].errors.length + " error was occured. It is unexpected.")
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
