// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');

// Functions ------------------------------------
const createCards = (quantity) => {
    let cards ='';
    let Num1=0, Num2=1, Num3=0;
    for(let i = 0; i < +quantity; i++){
        cards += `
        <div class="square">${Num1}
            <button class="ib" id="ib">x</button>
        </div>    
        `;
        Num3=Num1+Num2;
        Num1=Num2;
        Num2=Num3;        
    } 
    return cards;
}

const drawCards = (cards) => {
    response.innerHTML = cards;
}

// Event Handlers ---------------------------

const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cards = createCards(formData.get('quantity'));
    drawCards(cards);
    let botones = document.getElementsByClassName("ib");
    for(let i = 0; i < botones.length;i++){
        botones[i].addEventListener('click',function (){
            this.parentNode.remove();
        })
    }
}

// Event Listener
form.addEventListener('submit',onFormSubmit);