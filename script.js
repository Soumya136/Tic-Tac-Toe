let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//winning pattern
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5], 
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
//'X' plays first
let xTurn = true;
let cnt = 0;

//disable buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //enable popup
    popupRef.classList.remove("hide");
};

//enable all buttons
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    //disable popup
    popupRef.classList.add("hide");
};

//function when a person win
const winFunction = (letter) => {
    disableButtons();
    if(letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins...";
    } else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins...";
    }
};

//function for draw
const drawFunction = (letter) => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw...";
};

//new game
newgameBtn.addEventListener("click", () => {
    cnt = 0;
    enableButtons();
});
restartBtn.addEventListener("click", () => {
    cnt = 0;
    enableButtons();
});

//win logic
const winChecker = () => {
    for(let i of winningPattern) {
        let[element1, element2, element3] = [btnRef[i[0]].innerText,
                                             btnRef[i[1]].innerText,
                                             btnRef[i[2]].innerText
                                            ];
        //check if elements are filled
        if(element1 != "" && element2 != "" && element3 != "") {
            if(element1 == element2 && element2 == element3) {
                winFunction(element1);
            }
        }
    }
};

//display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if(xTurn) {
            xTurn = false;
            //display
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //display
            element.innerText = "O";
            element.disabled = true;
        }
        cnt += 1;
        if(cnt == 9) {
            drawFunction();
        }
        winChecker();
    });
});

//enable buttons and disable popup on page load
window.onload = enableButtons();