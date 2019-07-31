let opstack = [];
let strstack = [];
let input = process.argv.slice(2)[0];
let inputSplits = input.split("");
for (let i = 0; i < inputSplits.length; i++) {
    if (inputSplits[i] === " ") {
        continue;
    }

    if (inputSplits[i] === "(") {
        strstack.push(inputSplits[i]);
        let slice = inputSplits.slice(i);
        let spaceIndex = findIndexFromIndex(inputSplits, (element) => {
            return element === " ";
        });
        let op = input.substr(i + 1, spaceIndex - 1);
        opstack.push(op);
        i = spaceIndex + i;
    } else if (inputSplits[i] === ")") {
        let curOp = opstack[opstack.length - 1];
        opstack.pop();

        let nums = [];
        while (strstack[strstack.length - 1] !== "(") {
            let num = strstack[strstack.length - 1];
            nums.push(num);
            strstack.pop();
        }
        strstack.pop(); // pop (
        if (curOp === "+") {
            strstack.push(nums.reduce((c, n) => {
                return Number(c) + Number(n);
            }))
        }
    } else {
        let slice = inputSplits.slice(i);
        let spaceIndex = findIndexFromIndex(slice, (element) => {
            return element === " ";
        });
        let rightQuoteIndex = findIndexFromIndex(slice, (element) => {
            return element === ")";
        });

        if (spaceIndex < 0) {
            strstack.push(input.substr(i, rightQuoteIndex));
            i = rightQuoteIndex + i - 1;
        } else {
            if (spaceIndex < rightQuoteIndex) {
                strstack.push(input.substr(i, spaceIndex));
                i = spaceIndex + i;
            } else {
                strstack.push(input.substr(i, rightQuoteIndex));
                i = rightQuoteIndex + i - 1;
            }
        }
    }
}

function findIndexFromIndex(arr, func) {
    let i = arr.findIndex(func);
    return i;
}

console.log(strstack[0]);