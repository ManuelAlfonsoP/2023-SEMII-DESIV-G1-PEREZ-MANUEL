// HTML Elements
const form = document.querySelector('form');
const response = document.querySelector('#response');
//------------------------------------------------------

// Functions
const createRows = (quantity) => {
    let Rows = '';
    for(let i = 0; i < quantity; i++) {
        Rows += `
            <div class="row" id="row${i+1}"></div>
        `;
    }
    return Rows;
}

const drawRows = (Rows) => {
    response.innerHTML = Rows;
}

const drawSqr = (quantity) => {
    let RowCounter,SquareString, Sqr = ``, b =1;
    for(let a = 1; a <= quantity; a++){
        RowCounter = "row"+a;
            for(let i = 0  ; i < a; i++){
                SquareString = `<div class="square">${b}</div>`;
                Sqr += SquareString;
                b = b+1;
            }
        document.getElementById(RowCounter).innerHTML=Sqr;
        Sqr = ``;
    }
       
}
// -----------------------------------------------------

// Event Handlers
const onFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const Rows = createRows(formData.get('quantity'));
    drawRows(Rows);
    drawSqr(formData.get("quantity"));
}
// -----------------------------------------------------

// Event Listeners
form.addEventListener('submit', onFormSubmit);
// -----------------------------------------------------