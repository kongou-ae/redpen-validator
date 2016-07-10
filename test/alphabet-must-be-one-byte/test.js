var expectedResult = 1
var exec = require('child_process').exec;
exec('redpen -c ./alphabet-must-be-one-byte/redpen-conf.xml ../alphabet-must-be-one-byte/test.md -r json', function(err, stdout, stderr){
  var result = JSON.parse(stdout)
  console.log(result.length + " error was occured.")
  if (result.length != expectedResult){
    console.log(result.length + " error was occured. It is unexpected")
    process.exit(1);
  }
});
