let calcular = document.getElementById("Calcular");
let llamar = document.getElementById("Llamar");
const Pyramid = document.querySelector('.Pyramid')
const Path = document.querySelector('.Path')
let ArrayCounter = 0;
var StoredArray = new Array;
let GottenArray;

function AddArrayEp(X){
    let PostOne = new XMLHttpRequest();
    PostOne.open("POST", "http://localhost:4567/Add")
    PostOne.send(X)
    PostOne.onload = () => {
        // console.log(PostOne.response);
        console.log(PostOne.response);
        AllArrayEp();
    }
}
function GetArrayEp(X){
    let GetOne = new XMLHttpRequest();
    GetOne.open("GET", "http://localhost:4567/Id/"+X)
    GetOne.send()
    GetOne.onload = () => {
        // let Rows = JSON.parse(GottenArray.data).length;
        GottenArray = JSON.parse(GetOne.response);
        InjectRows(JSON.parse(GottenArray.data).length);
        StoredArray = (JSON.parse(GottenArray.data));
        PrintPyramidB(JSON.parse(GottenArray.data).length);
        let WeightArray=JSON.parse(JSON.stringify(StoredArray));
        WeightArray = CalculateWeigth(WeightArray, JSON.parse(GottenArray.data).length)
        let PathArray = Array.from(Array(JSON.parse(GottenArray.data).length).fill(0));
        PathCoordinates(WeightArray, PathArray, JSON.parse(GottenArray.data).length);
        ChangeColor(PathArray, JSON.parse(GottenArray.data).length);
        GeneratePath(PathArray, JSON.parse(GottenArray.data), JSON.parse(GottenArray.data).length);
        let Weight = WeightArray[0][0];
        PrintPath(PathArray,JSON.parse(GottenArray.data).length,Weight);
    }
   
}
function AllArrayEp(){
    let GetAll = new XMLHttpRequest();
    GetAll.open("GET", "http://localhost:4567/All")
    GetAll.send()
    GetAll.onload = () => {
        let a = JSON.parse(GetAll.response).data;
        var table = document.getElementById('myTable');
        table.innerHTML = ``;
        for(var i = 0; i<a.length;i-=-1){
            // El numero de la piramide es i
            // Falta el camino y el peso
            let WeightArray=JSON.parse(JSON.stringify(JSON.parse(a[i])));
            WeightArray = CalculateWeigth(WeightArray, JSON.parse(a[i]).length);
            let PathArray = Array.from(Array(JSON.parse(a[i]).length).fill(0));
            PathCoordinates(WeightArray,PathArray,JSON.parse(a[i]).length);
            GeneratePath(PathArray, JSON.parse(a[i]), JSON.parse(a[i]).length);
            let Weight = WeightArray[0][0];
            buildTable(i, JSON.parse(a[i]).length, Weight);
        }

    }
}

function RandomNumber(){
    let Rnumb = Math.floor(Math.random() * (99 - 1 +1))+ 1;
    return Rnumb;
}

function GenerateArray(Rows){ 
        let CreationArray = Array.from(Array(Rows), () => new Array(Rows).fill(0));
        for(let x = 0; x < Rows; x-=-1){
            for(let y = 0; y <= x; y-=-1){
                let RNumb = RandomNumber();//Llama la funcion de numero aleatorio
                CreationArray[x][y] = RNumb; 
            }
        }
        StoredArray[0] = CreationArray;
        ArrayCounter += 1;
        AddArrayEp(JSON.stringify(StoredArray[0]));

}

function InjectRows(RowsNumber){
    let rows='';
    for(let i = 0; i < RowsNumber; i++){
        rows += `
        <div class="row" id="row${i+1}"></div>`;
    }
    Pyramid.innerHTML = rows;
}

function PrintPyramidB (RowsNumber){
    let RowCounter, SquareString, Sqr='',RandNumb = 0, a=0, b;
    for(let x = 1; x <= RowsNumber; x-=-1){
        RowCounter = "row"+x;
        for(let y = 0; y < x; y-=-1){
            let o = StoredArray[x-1][y];
            SquareString = `<div class="cuadro" id="${x-1}-${y}">${o}</div>`;
            Sqr+=SquareString;
        }
        document.getElementById(RowCounter).innerHTML=Sqr;
        Sqr=``;
    }
}

function PrintPyramid(RowsNumber){
    let RowCounter, SquareString, Sqr='',RandNumb = 0, a=0, b;
    for(let x = 1; x <= RowsNumber; x-=-1){
        RowCounter = "row"+x;
        for(let y = 0; y < x; y-=-1){
            let o = StoredArray[0][x-1][y];
            SquareString = `<div class="cuadro" id="${x-1}-${y}">${o}</div>`;
            Sqr+=SquareString;
        }
        document.getElementById(RowCounter).innerHTML=Sqr;
        Sqr=``;
    }
}

function CalculateWeigth(WeightArray, filas){
    let a;
    for(i = filas-1;i > 0;i--){
        for(a = 0;a<i;a++){
            let mayor = Math.max(WeightArray[i][a],WeightArray[i][a+1]);
            WeightArray[i-1][a]+= mayor;
        }
    }
    return WeightArray;
}

function PathCoordinates(WeightArray,PathArray,filas){
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

function ChangeColor(PathArray,filas){
    for(let i=0;i<filas;i++){
        let cuadro = document.getElementById(PathArray[i]);
        cuadro.style.border = 'solid red 2px';
        cuadro.style.color = 'red';
    }
}

function GeneratePath(PathArray,OriginArray,filas){
    let a='';
    for(i = 0;i<filas;i++){
        a=PathArray[i];
        let Array = a.split("-");
        PathArray[i]=OriginArray[Array[0]][Array[1]];
    }
}

function PrintPath(PathArray,filas,Weight){
    let path = '';
    for(let i = 0; i < filas; i++){
        path += `<div class="cuadro">${PathArray[i]}</div>`;
    }
    path += `<div class="cuadro">=</div>`;
    path += `<div class="cuadro">${Weight}</div>`;
    Path.innerHTML = path;
}

function Validation(){ 
    var Rows = Number(document.getElementById("filas").value);
    if(Rows > 50 || Rows < 1){
        window.alert("Introduzca un valor entre 1 y 50");
    }else{
        GenerateArray(Rows);
        InjectRows(Rows);
        PrintPyramid(Rows);
        let WeightArray=JSON.parse(JSON.stringify(StoredArray[0]));
        WeightArray = CalculateWeigth(WeightArray, Rows);
        let PathArray = Array.from(Array(Rows).fill(0));
        PathCoordinates(WeightArray, PathArray, Rows);
        ChangeColor(PathArray, Rows);
        GeneratePath(PathArray,StoredArray[0],Rows);
        let Weight = WeightArray[0][0];
        PrintPath(PathArray,Rows,Weight);   
    }
}

calcular.addEventListener("click", Validation);
llamar.addEventListener("click", () => {
    Validation()
});

function buildTable(PyrNumb, Floors, Weight){
    var table = document.getElementById('myTable');
    var row = `<tr id="PyrL${PyrNumb}">
    <td >${PyrNumb+1}</td>
    <td >${Floors}</td>
    <td >${Weight}</td>
    </tr>`
    table.innerHTML += row;
    for(var i = PyrNumb; i >=0; i--){
        let number = i;
        let PyrL = document.getElementById('PyrL'+i);
        PyrL.addEventListener("click", () => {
            GetArrayEp(number);
        })
    }
}
