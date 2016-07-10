var expectedResult = 24
var exec = require('child_process').exec;
exec('redpen -c ../ka-is-written-in-hiragana/redpen-conf.xml ../ka-is-written-in-hiragana/test.md -r json', function(err, stdout, stderr){
  var result = JSON.parse(stdout)
  if (result[0].errors.length  != expectedResult){
    console.log(result[0].errors.length + " error was occured. It is unexpected")
    process.exit(1);
  } else {
    console.log(result[0].errors.length + " error was occured")
  }
});
