/* Creating some variables to realize our conventer    */ 
    var curRateUSD;
    var curRateEUR;
    var curRateRUB;
    var ondate;
    let date = document.querySelector('.date__change');     /* Picking div with class "date__change" from HTML file */
    let button = document.querySelector('.date__button');   /* The same as previous */
    date.addEventListener('input', () => {                  /* The realization of back-in-time currency exchange rate */
        ondate = date.value;
    button.addEventListener('click',() => {
        let form = document.querySelector('.form');
        form.reset();
        submit();
    })
    console.log(date.value);
});
    console.log(ondate);
async function submit() {
    let response = await fetch(`https://www.nbrb.by/api/exrates/rates?ondate=${ondate}&periodicity=0`);     /* Making a request on nbrb.by API to get currency exchange rates */
if (response.ok) {
    let json = await response.json();
    let USD = 'USD';
    let EUR = 'EUR';
    let RUB = 'RUB';
    for(var i = 0; i < json.length; i++) {      /* Looking for exact rates from array of 27 currencies */
    if(json[i].Cur_Abbreviation == USD) {
        curRateUSD = json[i].Cur_OfficialRate;
    }
    if(json[i].Cur_Abbreviation == EUR) {
        curRateEUR = json[i].Cur_OfficialRate;
    }
    if(json[i].Cur_Abbreviation == RUB) {
        curRateRUB = json[i].Cur_OfficialRate;
    }
    }
    return;
}
else {
    console.log('Error');
}
}
let input = document.querySelectorAll('.input');        /* Calculating the currencies among themself */
    input.forEach(item => {
        item.addEventListener('input',function(e) {
            if(e.target === input[0]) {
                let tree = input[0].value;
                input[1].value = ((curRateRUB / 100 * tree) / curRateEUR).toFixed(4);
                input[2].value = ((curRateRUB / 100 * tree) / curRateUSD).toFixed(4);
                input[3].value = (curRateRUB / 100 * tree).toFixed(4);
            }
            if(e.target === input[1]) {
                let tree = input[1].value;
                input[0].value = (tree * curRateEUR / (curRateRUB / 100)).toFixed(4);
                input[2].value = (tree * curRateEUR / curRateUSD).toFixed(4);
                input[3].value = (tree * curRateEUR).toFixed(4);
            }if(e.target === input[2]) {
                let tree = input[2].value;
                input[0].value = (tree * curRateUSD / (curRateRUB / 100)).toFixed(4);
                input[1].value = (tree * curRateUSD / curRateEUR).toFixed(4);
                input[3].value = (tree * curRateUSD).toFixed(4);
            }
            if(e.target === input[3]) {
                let tree = input[3].value;
                input[0].value = (tree / (curRateRUB / 100)).toFixed(4);
                input[1].value = (tree /curRateEUR).toFixed(4);
                input[2].value = (tree / curRateUSD).toFixed(4);
            }
        });
    })
submit();



/* This script allows to change the color of the background of the form and body in real time */
/* Just making some variables */
let color_form; 
let color_body;
let defaultColorBody = "#ebebeb";
let defaultColorForm = "#B0E0E6";

/* Making the key function that is made of another functions */ 
window.addEventListener("load", startup, false); /* Calling an event handler */
function startup() {
    color_form = document.querySelector("#color-table"); /* Reffering to required inputs in HTML document */
    color_body = document.querySelector("#color-text");
    color_form.value = defaultColorForm; /* Setting a default color for our text and table */
    color_body.value = defaultColorBody;
    color_form.addEventListener("input", updateForm, false); /* Fires when input value in HTML changes */
    color_form.addEventListener("change", updateForm, false); /* Fires when changes in input are commited by user */
    color_form.select();
    color_body.addEventListener("input", updateBody, false);
    color_body.addEventListener("change", updateBody, false);
    color_body.select();
}

function updateBody(event) { /* Changing body background */
    let body = document.querySelector("body");
  
    if (body) {
      body.style.background = event.target.value;
    }
}

function updateForm(event) { /* Changing form background */
    document.querySelectorAll("form");
    form.style.background = event.target.value;
    
}

function updateBody(event) { /* The same as the previous functions */
    let body = document.querySelector("body");
    if (body) {
      body.style.background = event.target.value;
    }
}

function updateForm(event) {
    let form = document.querySelector("form");
    if (form) {
      form.style.background = event.target.value;
    }
}