
var numRow = screen.height / 30;
var numCol = screen.width / 30;
var newSqr;
var canvas = document.getElementById("canvas");

var removeBox = function() {
    this.style.display = "none";
};

function createCanvas(){
    console.log("call create canvas");

    for (let i = 0; i < numRow; ++i ){
        for (let j = 0; j < numCol; ++j){
            console.log("one elem");
            newSqr = document.createElement('div');
            newSqr.className = 'blackbox';
            newSqr.style.top = i*30 + "px";
            newSqr.style.left = j*30 + "px";
            newSqr.style.display = "block";
            newSqr.addEventListener("mouseout", removeBox);
            canvas.appendChild(newSqr);
        }
    }
}


var canvas = document.getElementById("canvas");

createCanvas();
