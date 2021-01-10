import { add } from "lodash";

function calculate(s: string): number {
    function calc (num2: number, num1: number, operator: string) {
        if (operator=== '-') {
            return num1 - num2;
        } else {
            return num1 + num2;
        }
    }

    const numStack: number[][] = [[]];
    const operatorStack: string[] = [];

    let numString = '';

    function addNumber () {
        const last = numStack[numStack.length - 1];

        if (numString) {
            last.push(Number(numString));
            numString = '';
        }

        if (last.length === 2) {
            last.push(calc(
                last.pop() as number,
                last.pop() as number, 
                operatorStack.pop() as string
            ));
        }
    }

    for (let chr of s) {
        if (/[0-9]/.test(chr)) {
            numString += chr;
        } else if (/[\+\-]/.test(chr)) {
            addNumber();
            operatorStack.push(chr);
        } else if (chr === '(') {
            numStack.push([]);
        } else if (chr === ')') {
            addNumber();
            const last = numStack.pop() as [number];
            numStack[numStack.length - 1].push(...last);
            addNumber();
        }
    }

    if (numString) {
        addNumber();
    }

    if (operatorStack.length) {
        addNumber();
    }

    return numStack[0][0];
};


console.log(calculate("(1+(4+5+2)-3)+(6+8)"));
console.log(calculate(" 2-1 + 2 "));
console.log(calculate("1 + 1"));
console.log(calculate('0'));