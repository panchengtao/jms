let XRegExp = require("xregexp");

let input = process.argv.slice(2);
if (input.length !== 1) {
    console.log("wrong input length")
}
input = input[0].trim();
console.log(calc(input));

function calc(input) {
    let digitalRegexp = new RegExp(/^\d+/, "mi");
    input = input.substr(1, input.length - 2).trim(); // 去除括号
    if (input[0].match(/[+\-*/]/)) {
        let op = input[0];
        input = input.substr(1, input.length - 1).trim();
        if (op.match(/\+/)) {
            if (input.match(/^\d+/)) {
                let left = digitalRegexp.exec(input)[0];
                let reverseInput = reverse(input);
                if (reverseInput.match(/^\d+/)) {
                    return Number(left) + Number(input.split(" ")[1])
                } else if (input[input.length - 1].match(/\)/)) {
                    input = input.replace(left, "").trim();
                    return Number(left) + Number(calc(input));
                }
            } else if (input[0].match(/\(/)) {
                let reverseInput = reverse(input);
                if (reverseInput.match(/^\d+/)) {
                    let reverseRight = digitalRegexp.exec(reverseInput)[0];
                    reverseInput = reverseInput.replace(reverseRight, "");
                    input = reverse(reverseInput).trim();
                    let right = Number(reverse(reverseRight));
                    return Number(calc(input)) + right;
                } else if (input[input.length - 1].match(/\)/)) {
                    let regexps = XRegExp.matchRecursive(input, '\\(', '\\)', 'g');
                    return Number(calc(`(${regexps[0]})`)) + Number(calc(`(${regexps[1]})`));
                }
            }
        }
    }

    return "NULL";
}

function reverse(str) {
    return str.split('').reverse().join('');
}