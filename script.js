let btnCheck = document.querySelector(".check");
let result = document.querySelector(".result");
let groupContainer = document.querySelector(".group");
//add eventListner
btnCheck.addEventListener("click", () => {
  reset();
});

function reset() {
  let input = document.querySelector("#input").value;
  if (input == null || input == "") {
    alert("Please Enter Game result in array format");
    return;
  }
  input = input.replace("undefined", '"undefined"');
  let value;
  try {
    value = JSON.parse(input);
  } catch (e) {
    value = JSON.parse(JSON.stringify(input));
  }

  result.innerHTML = main(value);
}
function main(array) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      arr[i] = array[i][j];
    }
  }

  if (noGame(array)) {
    return "No/Incomplete game";
  }
  if (corruptedGame(arr)) {
    return "Corrupted game";
  }
  if (noMove(arr)) {
    return "Nobody moved";
  }
  let playerA = playerWins(arr, "X");
  let playerB = playerWins(arr, "O");
  if (playerA > 1 || playerB > 1) return "INVALID INPUT";
  if (playerA == 1 && playerB == 1) return "INVALID INPUT";
  if (playerA == 1 || playerB == 1) return "true";
  if (playerA == 0 || playerB == 0) return "false";
}

function playerWins(a, py) {
  let win = 0;
  if (a[0][0] == py && a[1][1] == py && a[2][2] == py) win++;
  if (a[0][2] == py && a[1][1] == py && a[2][0] == py) win++;
  if (a[0][0] == py && a[0][1] == py && a[0][2] == py) win++;
  if (a[1][0] == py && a[1][1] == py && a[1][2] == py) win++;
  if (a[2][0] == py && a[2][1] == py && a[2][2] == py) win++;
  if (a[0][0] == py && a[1][0] == py && a[2][0] == py) win++;
  if (a[0][1] == py && a[1][1] == py && a[2][1] == py) win++;
  if (a[2][0] == py && a[2][1] == py && a[2][2] == py) win++;
  return win;
}

function corruptedGame(ar) {
  for (let i = 0; i < ar.length; i++) {
    for (let j = 0; j < ar.length; j++) {
      if (ar[i][j] != "X" && ar[i][j] != "O" && ar[i][j] != "-") {
        return true;
      }
    }
  }
  return false;
}

function noGame(ar) {
  if (!ar) return true;
  for (let i = 0; i < ar.length; i++) {
    if (ar[i].length == 0 || !Array.isArray(ar[i])) {
      return true;
    }
  }
  return false;
}

function noMove(ar) {
  for (let i = 0; i < ar.length; i++) {
    for (let j = 0; j < ar.length; j++) {
      if (ar[i][j] != "-") {
        return false;
      }
    }
  }
  return true;
}
