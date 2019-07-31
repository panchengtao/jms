let {match, REST, _} = require("pampy");

function lisp(exp) {
    return match(exp,
        Function, (x) => {
            return x;
        },
        [Function, REST], (f, rest) => {
            return f.apply(null, rest.map(lisp))
        },
        Array, (l) => {
            return l.map(lisp);
        },
        _, (x) => x
    );
}

let plus = (a, b) => a + b;
let minus = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let newInput = "";
let input = process.argv.slice(2)[0];
let inputSplits = input.split("");
for (let i = 0; i < inputSplits.length; i++) {
    let char = inputSplits[i];
    if (char === "(") {
        newInput += "[";
    } else if (char === ")") {
        if (i + 1 < inputSplits.length) {
            newInput += "],";
        } else {
            newInput += "]";
        }
    } else if (char === " ") {
        newInput += " ";
    } else if (char === "+") {
        newInput += `"+",`;
    } else if (char === "-") {
        newInput += `"-",`;
    } else if (char === "*") {
        newInput += `"*",`;
    } else if (char === "/") {
        newInput += `"/",`;
    } else if (char.match(/\d/)) {
        if (i + 1 < inputSplits.length) {
            let nextChar = inputSplits[i + 1];
            if (nextChar.match(/\d|\)/)) {
                newInput += char;
            } else if (nextChar === " ") {
                newInput += `${char},`;
            }
        }
    }
}
let json = JSON.parse(newInput, (key, value) => {
    if (value === "+") {
        return plus;
    } else if (value === "-") {
        return minus;
    } else if (value === "*") {
        return multiply;
    } else if (value === "/") {
        return divide;
    } else {
        return value;
    }
});

console.log(lisp(json));