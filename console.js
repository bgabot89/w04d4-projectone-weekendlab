var REPL = require("repl");
var db = require("./models");

// add your project name to the prompt below
var repl = REPL.start(" >w04d4-projectone-weekendlab");
repl.context.db = db;
// repl.context.allUsers = allUsers;
// repl.context.clearUsers = clearUsers;

repl.on("exit", function () {
  console.log("Goodbye");
  process.exit();
});

//function allUsers() {
//  db.User.find({}, function (err, users) {
//    if (err) { return console.log(err); }
//    return console.log(users);
//  });
//}

//function clearUsers() {
 // db.User.remove({}, function (err, users) {
 //   if (err) { return console.log(err); }
 //   return console.log(users);
 // });
//}
