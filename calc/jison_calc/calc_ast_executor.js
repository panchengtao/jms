let parser = require("./calc_ast");
console.log(JSON.stringify(parser.parse("(+ 1 (+ 1 2))")));