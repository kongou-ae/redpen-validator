var expectedResult = 24;
var exec = require('child_process').exec;
var fs = require('fs');

var r = fs.createReadStream('ka-is-written-in-hiragana.js'),
    w = fs.createWriteStream('test/ka-is-written-in-hiragana.js');

r.pipe(w);
w.on('close', function(){
  exec('redpen -c test/redpen-conf.xml test/doc/ka-is-written-in-hiragana.md -r json', function(err, stdout, stderr){
    if (err) throw err;
    fs.unlink('test/ka-is-written-in-hiragana.js',function(){
      var result = JSON.parse(stdout)
      if (result[0].errors.length !== expectedResult){
        throw new Error(result[0].errors.length + " error was occured. It is unexpected.")
      } else {
        console.log(result[0].errors.length + " error was occured. This is expected.")
      }
    });
  });
});
