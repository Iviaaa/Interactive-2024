
var numRow = screen.height / 50;
var numCol = screen.width / 50;
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
            newSqr.style.top = i*50 + "px";
            newSqr.style.left = j*50 + "px";
            newSqr.style.display = "block";
            newSqr.addEventListener("mouseout", removeBox);
            canvas.appendChild(newSqr);
        }
    }
}


var canvas = document.getElementById("canvas");

createCanvas();
