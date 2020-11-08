let buffer = "0";
let result = 0;
let preOperator = null;

let output = document.querySelector(".output");

const rerender = () => {
    output.innerText = buffer;
}

const clearOutput = () => {
    buffer = "0"
    result = 0;
    preOperator = null;
    rerender()
}

const numClicked = e => {
    if (buffer === "0") {
        buffer = e.target.textContent;
    }
    else {
        buffer += e.target.textContent;
    }
}

const delNum = () => {
    if (buffer.length === 1) {
        buffer = "0"
    }
    else {
        buffer = buffer.substring(0, buffer.length-1)
    }
}

const showEquals = () => {
    if (preOperator === null) {
        return;
    }
    clearOperation(parseInt(buffer));
    preOperator = null;
    buffer = "" + result;
    result = 0;
}

const clearOperation = (a) => {
    if(preOperator === "+") {
        result += a;
    }
    else if(preOperator === "-") {
        result -= a;
    }
    else if(preOperator === "*") {
        result *= a;
    }
    else {
        result /= a;
    }
}

const mathOperation = (e) => {
    const a = parseInt(buffer)
    if(result === 0) {
        result = a;
    }
    else {
        clearOperation(a)
    }
    preOperator = e.target.textContent;
    buffer = "0"
    rerender()
}

const makeDecision = (e) => {
    if(isNaN(parseInt(e.target.textContent))) {
        switch (e.target.textContent) {
            case "C":
                clearOutput()
                break;
            case "D":
                delNum()
                break;
            case "=":
                showEquals()
                break;
            case "*":
            case "+":
            case "/":
            case "-":
                mathOperation(e)
                break;
        }
    }
    else {
        numClicked(e)
    }
    rerender()
}

document.querySelector(".cal-buttons").addEventListener("click", makeDecision);