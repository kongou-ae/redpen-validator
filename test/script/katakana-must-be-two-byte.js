var expectedResult = 55
var exec = require('child_process').exec;
exec('redpen -c test/redpen-conf.xml test/doc/katakana-must-be-two-byte.md -r json', function(err, stdout, stderr){
  var result = JSON.parse(stdout)
  if (result[0].errors.length  != expectedResult){
    console.log(result[0].errors.length + " error was occured. It is unexpected.")
    process.exit(1);
  } else {
    console.log(result[0].errors.length + " error was occured. This is expected.")
  }
});