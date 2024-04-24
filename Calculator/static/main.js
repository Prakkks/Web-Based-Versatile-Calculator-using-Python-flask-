let lastoutput = null;
const res1 = document.getElementById("inputbars");
 const res2 = document.getElementById("resultant");
//  const Fraction = require('fraction.js');


function clickPress(event) {
    if (event.key == "Enter") {
        // do something
        data = res1.value;
        var preprocessedExpression = insertMultiplication(data);
        var postfixExpression = infixToPostfix(preprocessedExpression);
        console.log('Postfix Notation:', postfixExpression);
        result = evaluatePostfix(postfixExpression);
        console.log('Result:', result);
        res2.innerHTML = result;
    }
}


function inputbar(value){
    
    
    
       data = res1.value;
       data += value;
        console.log(data)
       console.log(value)
        // $.ajax({ 
        //     url: '/process', 
        //     type: 'POST', 
        //     contentType: 'application/json', 
        //     data: JSON.stringify({ 'value': data }), 
            
        // }); 
      
      
       res1.value = data;      
}

function einputbar(value)
{
    data = res1.value;
    switch (value)
    {
        case 'sine':
        data += ' sin('    
       
        break;
        
        case 'lpar':
            data += '('   
        break; 

        case 'rpar':
            data += ')'   
        break; 

        case 'cosine':
            data += ' cos('   
        break; 

        case 'tan':
            data += ' tan('   
        break;

        case 'log':
            data += ' log('   
        break; 

        case 'ln':
            data += ' ln('   
        break; 

        case 'factorial':
            numparenthesis('!)');
        break; 

        case 'equal':
            // let infixExpression = '3 + 14 * 2 / (12 - 5)^2';
            var preprocessedExpression = insertMultiplication(data);
            var postfixExpression = infixToPostfix(preprocessedExpression);
            console.log('Postfix Notation:', postfixExpression);
            result = evaluatePostfix(postfixExpression);
            console.log('Result:', result);
            res2.innerHTML = result;
        break; 


        case '1/x':
            numparenthesis('/');
            data = data1;
        break; 

        case 'pi':
            res1.value =       res1.value +'*' +    "\u03C0" ;
            data =res1.value;  
        break; 
        
        case 'power3':
            numparenthesis('^3)');            
        break; 

        case 'power2':
            numparenthesis('^2)');            
        break;

        case 'back':
            data1 = ''
            var j = data.length;
            for (var i= 0 ; i< j-1 ;i++)
            {
                data1 += data[i];
            }
            data = data1;
        break;

        case '^':
            numparenthesis('^');            
        break;
        
        case '10^x':
            data = res1.value + '(10^';
                      
        break;

        case '%':
            numparenthesis('%)');
                      
        break;

        case 'ans':
            if( lastoutput !== null)
            data = res1.value + lastoutput;
        break;

        case '10^x':
            if(lastoutput !== null)
            {
            data = res1.value + lastoutput
            }         

        break;

        case 'sqrt':
            res1.value =       res1.value + ''+   "\u221A" + '(';
            data =res1.value;  
        break; 

        case 'clear':
             data = ''           
        break;

        default:

    }
   
    res1.value = data;
}

function numparenthesis(val){
    var str = ["0" ,'1' , '2','3','4','5','6','7','8','9','0','.']
      data1=data.toString();
    
    var j = data1.length;
 
    for ( var i = data1.length-1 ; i > 0; i--) {
        var letter = data1[i]; 
       
        if (!str.includes(data1[i])) {

            if( i !== data1.length -1)
            data1 = data1.substring(0, i+1 ) + '(' + data1.substring(i + 1,j) + val ;
           

            break;
        }
        else{
            
            continue;
        }

    }
    if(i == 0)
            {
            data1 =  '(' + data1 + val;
            }
    data = data1;
}



function insertMultiplication(expression) {
    // Regex to match patterns where a number is followed by parentheses without an explicit operator
    const regex = /(\d+)(\()/g;

    // Replace matches with the number followed by *
    return expression.replace(regex, '$1*$2');
}

function infixToPostfix(expression) {
    const precedence = {
        '^': 4,
        '!': 4, // Factorial operator precedence
        '√': 4, // Square root operator precedence
        'sin': 4, // Sine operator precedence
        'cos': 4, // Cosine operator precedence
        'tan': 4, // Tangent operator precedence
        'e': 4, // Euler's number precedence
        'log': 4, // Logarithm operator precedence
        'ln': 4, // Natural logarithm operator precedence
        '%': 4,
        '*': 3,
        '/': 3,
        '+': 2,
        '-': 2
    };

    let output = '';
    let stack = [];

    // Helper function to check if a character is an operator
    function isOperator(token) {
        return precedence.hasOwnProperty(token);
    }

    // Helper function to compare precedence of operators
    function comparePrecedence(op1, op2) {
        return precedence[op1] - precedence[op2];
    }

    // Split the expression into tokens
    let tokens = expression.match(/\d+|\^|\*|\/|\+|\-|\(|\)|π|e|sin|cos|tan|√|log|ln|!|%/g);

    tokens.forEach((token, index) => {
        if (!isNaN(token) || token === 'π') {
            // Operand or π
            output += token === 'π' ? parseFloat(Math.PI.toFixed(2)) + ' ' : token + ' ';
        } else if (token === '(') {
            // Left parenthesis
            stack.push(token);
        } else if (token === ')') {
            // Right parenthesis
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output += stack.pop() + ' ';
            }
            stack.pop(); // Discard the '('
        } else if (isOperator(token)) {
            // Operator
            while (stack.length > 0 && isOperator(stack[stack.length - 1]) && comparePrecedence(token, stack[stack.length - 1]) <= 0) {
                output += stack.pop() + ' ';
            }
            stack.push(token);
        }
    });

    // Pop any remaining operators from the stack and add to output
    while (stack.length > 0) {
        output += stack.pop() + ' ';
    }

    // Remove extra space at the end
    return output.trim();
}

function evaluatePostfix(expression) {
    let stack = [];

    // Function to check if a character is an operator
    function isOperator(token) {
        return ['+', '-', '*', '/', '^', '!', '√', 'sin', 'cos', 'tan', 'e', 'log', 'ln', '%'].includes(token);
    }

    // Function to perform an operation
    function operate(op1, op2, operator) {
        switch (operator) {
            case '+':
                return op1 + op2;
            case '-':
                return op1 - op2;
            case '*':
                return op1 * op2;
            case '/':
                return op1 / op2;
            case '^':
                return Math.pow(op1, op2);
            case '!':
                return factorial(op1);
            case '√':
                return Math.sqrt(op1);
            case 'sin':
                return Math.sin((op1 * Math.PI) / 180); // Convert degrees to radians
            case 'cos':
                return Math.cos((op1 * Math.PI) / 180); // Convert degrees to radians
            case 'tan':
                return Math.tan((op1 * Math.PI) / 180); // Convert degrees to radians
            case 'e':
                return Math.E;
            case 'log':
                return Math.log10(op1);
            case 'ln':
                return Math.log(op1);
            case '%':
                return op1 /100; // Apply percentage operation
        }
    }

    // Function to compute factorial
    function factorial(n) {
        if (n === 0 || n === 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    // Iterate through each token in the expression
    for (let token of expression.split(' ')) {
        if (!isOperator(token)) {
            // Operand: push onto stack
            stack.push(parseFloat(token));
        } else {
            // Operator: pop operands, perform operation, and push result onto stack
            if (token === '!' || token === '√' || token === 'sin' || token === 'cos' || token === 'tan' || token === 'e' || token === 'log' || token === 'ln' || token === '%') {
                let op1 = stack.pop();
                let result = operate(op1, null, token);
                stack.push(result);
            } else {
                let op2 = stack.pop();
                let op1 = stack.pop();
                let result = operate(op1, op2, token);
                stack.push(result);
            }
        }
    }
    lastoutput = stack.pop();
    
    // The final result is the only element remaining in the stack
    return lastoutput;
}
