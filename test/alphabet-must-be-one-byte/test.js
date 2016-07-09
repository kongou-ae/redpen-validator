var expectedResult = 0
var exec = require('child_process').exec;
exec('redpen -c ./alphabet-must-be-one-byte/redpen-conf.xml ../alphabet-must-be-one-byte/test.md -r json', function(err, stdout, stderr){
  var result = JSON.parse(stdout)
  if (result.length != expectedResult){
    process.exit(1);
  }
});
