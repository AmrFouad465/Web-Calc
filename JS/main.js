let deleteButton=document.getElementById("delete");
let clearButton=document.getElementById("clear");
let percentButton=document.getElementById("percent");
let divideButton=document.getElementById("divide");
let oneButton=document.getElementById("one");
let twoButton=document.getElementById("two");
let threeButton=document.getElementById("three");
let multiplyButton=document.getElementById("multiply");
let fourButton=document.getElementById("four");
let fiveButton=document.getElementById("five");
let sixButton=document.getElementById("six");
let plusButton=document.getElementById("plus");
let sevenButton=document.getElementById("seven");
let eightButton=document.getElementById("eight");
let nineButton=document.getElementById("nine");
let minusButton=document.getElementById("minus");
let zeroButton=document.getElementById("zero");
let dotButton=document.getElementById("dot");
let eqButton=document.getElementById("eq");
let expressionElement=document.getElementById("expression");
let resultElement=document.getElementById("result");
let display=[];
let expression=[];
deleteButton.onclick=function(e){
    if(display.length === 0)
    {
        e.preventDefault();
    }
    display.pop();
    expression.pop();
    expressionElement.innerHTML=display.join("");

};
clearButton.onclick=function(e){
   
    while(display.length>0){
    display.pop();
    }
    while(expression.length>0){
    expression.pop();
    }
    expressionElement.innerHTML="";
    resultElement.innerHTML="";

};
percentButton.onclick=function(e){
   
    display.push("%");
    expression.push(" * 0.01")
    expressionElement.innerHTML=display.join("");

};
divideButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-divide\"></i>");
    expression.push(" / ");
    expressionElement.innerHTML=display.join("");

};
oneButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-1\"></i>");
    expression.push("1");
    expressionElement.innerHTML=display.join("");

};
twoButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-2\"></i>");
    expression.push("2");
    expressionElement.innerHTML=display.join("");

};
threeButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-3\"></i>");
    expression.push("3");
    expressionElement.innerHTML=display.join("");

};
fourButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-4\"></i>");
    expression.push("4");
    expressionElement.innerHTML=display.join("");

};
fiveButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-5\"></i>");
    expression.push("5");
    expressionElement.innerHTML=display.join("");

};
sixButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-6\"></i>");
    expression.push("6");
    expressionElement.innerHTML=display.join("");

};
sevenButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-7\"></i>");
    expression.push("7");
    expressionElement.innerHTML=display.join("");

};
eightButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-8\"></i>");
    expression.push("8");
    expressionElement.innerHTML=display.join("");

};
nineButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-9\"></i>");
    expression.push("9");
    expressionElement.innerHTML=display.join("");

};
zeroButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-0\"></i>");
    expression.push("0");
    expressionElement.innerHTML=display.join("");

};
multiplyButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-xmark\"></i>");
    expression.push(" * ");
    expressionElement.innerHTML=display.join("");

};
plusButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-plus\"></i>");
    expression.push(" + ");
    expressionElement.innerHTML=display.join("");

};
minusButton.onclick=function(e){
   
    display.push("<i class=\"fa-solid fa-minus\"></i>");
    expression.push(" - ");
    expressionElement.innerHTML=display.join("");

};
dotButton.onclick=function(e){
   
    display.push(".");
    expression.push(".");
    expressionElement.innerHTML=display.join("");

};
function getOperationPriority(operation){
    if(operation=== "*" || operation==="/")
        return 2;
    else {
        return 1 ;
    }
};
function getPostfix(){
    let Stack=[];
    let exp=expression.join("").split(" ");
    while(exp.length>0)
    {
       if(!isNaN(exp[0]))
       {
        Stack.push(exp.shift());
       }
       else if((exp.length>2) && (getOperationPriority(exp[0]) >= getOperationPriority(exp[2]))){
        let op=exp.shift();
        Stack.push(exp.shift());
        Stack.push(op);
       }
       else if(exp.length>2){
        let op1=exp.shift()
        Stack.push(exp.shift());
        let op2=exp.shift()
        Stack.push(exp.shift());
        Stack.push(op2);
        while(getOperationPriority(op1)<getOperationPriority(exp[0]) && exp[0]!="")
        {
        op2=exp.shift()
        Stack.push(exp.shift());
        Stack.push(op2);
        }
        Stack.push(op1);
       }
       else{
        let op=exp.shift();
        let num=exp.shift();
        if(num === "")
            {
                Stack.push("U");
            }
        else{
            Stack.push(num)
        }
        Stack.push(op);

       }

    }
    let postfix=Stack.join(" ");
    console.log(postfix);
    return postfix;
};
function evaluatePostfix(expression){
        let exp=expression.split(" ");
        let Stack=[];
        while(exp.length>0){
            if(!isNaN(exp[0]))
            {
                Stack.push(parseFloat(exp.shift()));
            }
            else{
                let n2=Stack.pop();
                let n1=Stack.pop();
                let operation= exp.shift();
                if(n1==="U" || n2 === "U")
                {
                    return "SyntaxErr";
                }
                if(operation==="*")
                {
                    Stack.push(n1*n2);
                }
                else if(operation==="/")
                {
                    Stack.push(n1/n2);
                }
                else if(operation==="+")
                {
                    Stack.push(n1+n2);
                }
                else
                {
                    Stack.push(n1-n2);
                }
                
            }
        }

        return Stack.pop();
};

eqButton.onclick=function(e){
    let result=evaluatePostfix(getPostfix());
    resultElement.innerHTML=result;
    while(display.length>0){
    display.pop();
    }
    while(expression.length>0){
    expression.pop();
    }
    
    display.push(result);
    expression.push(result);

};


