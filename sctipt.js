const body = document.querySelector('body');
const switcherLeft = document.querySelectorAll('.calc__side__switcher .left')
const switcherRight = document.querySelectorAll('.calc__side__switcher .right')
const inputLeft = document.getElementById('left-input');
const inputRight = document.getElementById('right-input');
const rateLeft = document.getElementById('left-rate');
const rateRight = document.getElementById('right-rate');
let currencyLeft = 'RUB';
let currencyRight = 'USD';

const BASE_URL = `https://api.exchangerate.host/latest?base=`;


function onActiveLeft(event){ 
    const leftArray = Array.from(switcherLeft);
    leftArray.forEach((e)=>{

        if(event.target.innerText == e.innerText){
            e.classList.add('active')
        }else{
        e.classList.remove('active');
        }
    }) 
    currencyLeft = event.target.innerText;
    console.log(currencyLeft);
    convertCurrency();
    return currencyLeft;
}

function onActiveRight(event){ 
    const rightArray = Array.from(switcherRight);
    rightArray.forEach((e)=>{

        if(event.target.innerText == e.innerText){
            e.classList.add('active')
        }else{
        e.classList.remove('active');
        }
    }) 
    currencyRight = event.target.innerText;
    console.log(currencyRight);
    convertCurrency();
    return currencyRight;

}

 async function convertCurrency(){

   if(currencyLeft !== currencyRight){
     await fetch(`${BASE_URL}${currencyLeft}&symbols=${currencyRight}`)
    .then((respone) =>{
       return respone.json();
    })
    .then((data) =>{
    inputRight.value = (data.rates[currencyRight] * inputLeft.value).toFixed(3);
    rateLeft.innerText = `1 ${currencyLeft} = ${(data.rates[currencyRight]).toFixed(4)} ${currencyRight}`;
     fetch(`${BASE_URL}${currencyRight}&symbols=${currencyLeft}`)
    .then((response_right) =>{
        return response_right.json();
    })
    .then((data_right) =>{
        rateRight.innerText = `1 ${currencyRight} = ${(data_right.rates[currencyLeft]).toFixed(4)} ${currencyLeft}`;
   
    })
    
    })
    .catch(()=>{
        body.innerHTML = ' ';
        window.open('./404.htm', '_self');
    });
}

}

window.onload = convertCurrency;

switcherLeft.forEach((e) =>{
    e.addEventListener('click',onActiveLeft)
})

switcherRight.forEach((e) =>{
    e.addEventListener('click',onActiveRight)
})


inputLeft.addEventListener('keyup', function(event){
    if(event.code == 'Enter'){
        convertCurrency()
    }
})

