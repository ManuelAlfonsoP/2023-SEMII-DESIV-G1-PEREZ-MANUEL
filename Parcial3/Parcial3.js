const Pyramid = document.querySelector('.Pyramid')
const Path = document.querySelector('.Path')
let numero1;

function InjectRows(quantity){//Se crean las filas
    let rows='';
    for(let i = 0; i < quantity; i++){
        rows += `
        <div class="row" id="row${i+1}"></div>`;
    }
    Pyramid.innerHTML = rows;
}

function InjectSquare(filas, OriginArray){//Se crean los cuadros, y se les asigna los numeros aleatorios
    let RowCounter, SquareString, Sqr = '', a, b,x=0 ,y;
    for(let a = 1; a <= filas; a++){
        y=0;
        RowCounter = "row"+a;
        for(let i = 0; i < a; i++){
            b = Math.floor(Math.random() * (99 - 1 +1))+ 1;
            SquareString = `<div class="cuadro" id="${x}-${y}">${b}</div>`;
            Sqr += SquareString;
            OriginArray[a-1][i] = b;
            y++;
        }
        document.getElementById(RowCounter).innerHTML=Sqr;
        Sqr = ``;
        x++;
    }
    return OriginArray;
}
            
function CalculateWeigth(WeightArray, filas){//Calcula el peso maximo de la piramide
    let a,mayor;
    for(i = filas-1;i > 0;i--){
        for(a = 0;a<i;a++){
            mayor = Math.max(WeightArray[i][a],WeightArray[i][a+1]);
            WeightArray[i-1][a]+= mayor;
        }
    }
    return WeightArray;
}

function PathCoordinates(WeightArray,PathArray,filas){//Genera las coordenadas
    let y=0;
    PathArray[0]='0-0';
    for(x=1;x<filas;x++){
        if(WeightArray[x][y]>WeightArray[x][y+1]){
            PathArray[x]=''+x+'-'+y+'';
        }else{
            PathArray[x]=''+x+'-'+(y+1)+'';
            y+=1;
        }
    }
}

function GeneratePath(PathArray,OriginArray,filas){//Genera el camino de la piramide
    let a='', Array;
    for(i = 0;i<filas;i++){
        a=PathArray[i];
        Array = a.split("-");
        PathArray[i]=OriginArray[Array[0]][Array[1]];
    }
}

function ChangeColor(PathArray,filas){//Cambia el color de los cuadros en la piramide
    for(let i=0;i<filas;i++){
        let cuadro = document.getElementById(PathArray[i]);
        cuadro.style.border = 'solid red 2px';
        cuadro.style.color = 'red';
    }
}

function PrintPath(PathArray,filas,Weight){//Imprime el camino de la piramide
    let path = '';
    for(let i = 0; i < filas; i++){
        path += `<div class="cuadro"style="Color:red;border:solid red 2px;">${PathArray[i]}</div>`;
    }
    path += `<div class="cuadro" style="Color:red;border:solid red 2px;">=</div>`;
    path += `<div class="cuadro" style="Color:red;border:solid red 2px;">${Weight}</div>`;
    Path.innerHTML = path;
}

function CreatePyramid(){//Crea la piramide
    if(!(numero1==null)){
        let filas = numero1;
        let OriginArray = Array.from(Array(filas), () => new Array(filas).fill(0));
        let PathArray = Array.from(Array(filas).fill(0));
        let Weight;  
        InjectRows(filas);
        OriginArray = InjectSquare(filas,OriginArray);
        let WeightArray=JSON.parse(JSON.stringify(OriginArray));
        WeightArray = CalculateWeigth(WeightArray, filas);
        PathCoordinates(WeightArray,PathArray,filas);
        ChangeColor(PathArray,filas);
        GeneratePath(PathArray,OriginArray,filas);
        Weight=WeightArray[0][0];
        PrintPath(PathArray,filas,Weight);
    }else{
        window.alert("Introduzca datos antes de reiniciar la piramide.")
    }
    
}

function Validation(event){//Valida el input
    let numero = Number(document.getElementById("filas").value);
    if(numero>=1 && numero<=50){
        numero1 = numero;
        CreatePyramid();
    }else{
        window.alert("El numero tiene que estar entre 1 y 50");
    }
    
}

let calcular = document.getElementById("Calcular");
let retry = document.getElementById("Retry")
calcular.addEventListener("click", Validation);
retry.addEventListener("click", CreatePyramid);