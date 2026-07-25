const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");
const themeBtn = document.getElementById("themeBtn");

let expression = "";

buttons.forEach(button => {

    button.addEventListener("click", () => {

        const value = button.innerText;

        switch(value){

            case "AC":
                expression = "";
                display.value = "";
                break;

            case "⌫":
                expression = expression.slice(0,-1);
                display.value = expression;
                break;

            case "=":

                try{

                    let exp = expression
                        .replace(/÷/g,"/")
                        .replace(/×/g,"*");

                    display.value = eval(exp);

                    expression = display.value;

                }catch{

                    display.value="Error";
                    expression="";
                }

                break;

            case "%":

                try{

                    display.value = eval(expression)/100;

                    expression = display.value;

                }catch{

                    display.value="Error";
                    expression="";
                }

                break;

            case "+/-":

                if(expression){

                    expression = (-Number(expression)).toString();

                    display.value = expression;

                }

                break;

            default:

                expression += value;

                display.value = expression;

        }

    });

});
themeBtn.onclick = () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML="☀️";

    }

    else{

        themeBtn.innerHTML="🌙";

    }

};
document.addEventListener("keydown",(e)=>{

    if((e.key>="0" && e.key<="9") || "+-*/.%".includes(e.key)){

        expression += e.key;

        display.value = expression;

    }

    else if(e.key==="Enter"){

        try{

            display.value = eval(expression);

            expression = display.value;

        }

        catch{

            display.value="Error";

            expression="";

        }

    }

    else if(e.key==="Backspace"){

        expression = expression.slice(0,-1);

        display.value = expression;

    }

    else if(e.key==="Escape"){

        expression="";

        display.value="";

    }

});