const lambdaExp = new RegExp(/^\(lambda\s+\((\w+)\)\s+(.*)\)$/, "mi");
const letExp = new RegExp(/^\(let\s+(\(\[[^\]]+]\))\s+(\(.*\))\)$/, "mi");
const pairExp = new RegExp(/^\(\[(\w+)\s+(.*)]\)$/, "mi");
const callExp = new RegExp(/^\((\(.*\)|\w+)\s+(\w)\)$/, "mi");
const opExp = new RegExp(/^\(([+\-*\/])\s+(\w+)\s+(\w+)\)$/, "mi");
function ext_env(x, v, env) {
    let ext = [{[x]: v}];
    ext.push(...env);
    return ext;
}

function lookup(x, env) {
    let value;
    env.forEach((item) => {
        if (value) {
            return value;
        }
        for (const key of Object.keys(item)) {
            if (key === x) {
                value = item[key];
                break;
            }
        }
    });
    return value;
}

// 闭包的数据结构定义，包含一个函数定义 f 和它定义时所在的环境
let Closure = function (f, env) {
    this.f = f;
    this.env = env;
};

// 解释器的递归定义（接受两个参数，表达式 exp 和环境 env）
// 共 5 种情况（变量，函数，绑定，调用，数字，算术表达式）
function interp(exp, env) {
    let expType = typeof exp;
    if (expType === "string") {
        if (exp.match(/^\d+$/)) {
            return exp;
        }

        // 匹配变量
        if (exp.match(/^[a-zA-Z]+$/)) {
            return lookup(exp, env);
        }

        // 匹配函数
        if (lambdaExp.test(exp)) {
            return new Closure(exp, env);
        }

        // 匹配绑定
        if (letExp.test(exp)) {
            let result = letExp.exec(exp);
            let pair = pairExp.exec(result[1]);
            let v = interp(pair[2], env);
            return interp(result[2], ext_env(pair[1], v, env))
        }

        // 匹配调用
        if (callExp.test(exp)) {
            let result = callExp.exec(exp);
            let v1 = interp(result[1], env);
            let v2 = interp(result[2], env);
            if (v1 instanceof Closure) {
                let result = lambdaExp.exec(v1.f);
                return interp(result[2], ext_env(result[1], v2, v1.env))
            }
        }

        if (opExp.test(exp)) {
            let result = opExp.exec(exp);
            let op = result[1];
            let d1 = interp(result[2], env);
            let d2 = interp(result[3], env);
            if (op === "+") {
                return Number(d1) + Number(d2);
            }
            if (op === "-") {
                return Number(d1) - Number(d2);
            }
            if (op === "*") {
                return Number(d1) * Number(d2);
            }
            if (op === "/") {
                return Number(d1) / Number(d2);
            }
        }
    }
}

module.exports = {
    lookup,
    interp,
    Closure,
};
