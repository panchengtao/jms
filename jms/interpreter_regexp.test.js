const interpreter = require('./interpreter_regexp');

// 算术表达式
console.log(interpreter.interp('(+ 2 7)', [{}]));

// let 表达式
console.log(interpreter.interp('(let ([x 2]) (+ x 2))', [{}]));

// lambda 表达式
console.log(interpreter.interp('((lambda (x) (+ x 1)) 2)', [{}]));

// 复合表达式
console.log(interpreter.interp('(let ([x 6]) (let ([f (lambda (y) (+ x y))]) (let ([x 4]) (f 3))))', [{}]));
