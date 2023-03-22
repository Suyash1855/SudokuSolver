

var board = new Array(9);

for (var i = 0; i < board.length; i++) {
  board[i] = new Array(9);
}

function matFill(){
  let k=0;
  for(var i=0; i< board.length; i++){
    for(var j=0;j<board[0].length; j++){
      board[i][j]=Number(document.querySelectorAll("input")[k].value);
      k++;
    }
  }

  if(isValidSudoku(board)==true){
  solveSudoku(board);
  console.log(board);
  fillInput();
  }
  else{
    document.querySelector('.p-tag').innerHTML='The entered sudoku is not valid i.e you have entered same value in same column or row or the 3*3 grid. ';
    document.querySelector('.p-tag').classList.add('active');
  }
  } 

  function valid(ch, i, j, board) {
    for (let k = 0; k < 9; k++) {
      if (k !== i) {
        if (board[k][j] === ch) {
          return false;
        }
      }
    }
  
    for (let m = 0; m < 9; m++) {
      if (m !== j) {
        if (board[i][m] === ch) {
          return false;
        }
      }
    }
  
    const row = Math.floor(i / 3) * 3;
    const col = Math.floor(j / 3) * 3;
  
    for (let x = row; x < row + 3; x++) {
      for (let y = col; y < col + 3; y++) {
        if (x !== i && y !== j) {
          if (board[x][y] === ch) {
            return false;
          }
        }
      }
    }
  
    return true;
  }
  
  function isValidSudoku(board) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== 0) {
          if (!valid(board[i][j], i, j, board)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  function solveSudoku(matrix) {
    // Define a helper function to check if a given number is valid in a cell
    function isValid(row, col, num) {
      // Check if the number is already present in the row or column
      for (let i = 0; i < 9; i++) {
        if (matrix[row][i] === num || matrix[i][col] === num) {
          return false;
        }
      }
      // Check if the number is already present in the 3x3 sub-grid
      const subGridRow = Math.floor(row / 3) * 3;
      const subGridCol = Math.floor(col / 3) * 3;
      for (let i = subGridRow; i < subGridRow + 3; i++) {
        for (let j = subGridCol; j < subGridCol + 3; j++) {
          if (matrix[i][j] === num) {
            return false;
          }
        }
      }
      // The number is valid in the given cell
      return true;
    }
  
    // Define a recursive helper function to solve the Sudoku puzzle
    function solveHelper(row, col) {
      // If we've reached the end of the matrix, we've solved the puzzle
      if (row === 9) {
        return true;
      }
      // If the current cell is already filled, move on to the next one
      if (matrix[row][col] !== 0) {
        if (col === 8) {
          return solveHelper(row + 1, 0);
        }
        return solveHelper(row, col + 1);
      }
      // Try all possible numbers in the current cell
      for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num)) {
          matrix[row][col] = num;
          if (col === 8 ? solveHelper(row + 1, 0) : solveHelper(row, col + 1)) {
            return true;
          }
          matrix[row][col] = 0;
        }
      }
      // If none of the numbers work, backtrack
      return false;
    }
  
    // Call the helper function to solve the puzzle
    solveHelper(0, 0);
  }

  function fillInput() {
    // Select the input element by ID
    let x=0;
    for(let i=0; i<board.length; i++){
      for(let j=0; j<9; j++){
        const input = document.querySelectorAll("input")[x];
        input.value = board[i][j];
        x++;
        
      }
    }
  
    // Set the value of the input element
  }

  function reset(){
    let x=0;
    for(let i=0; i<board.length; i++){
      for(let j=0; j<9; j++){
        const input = document.querySelectorAll("input")[x];
        input.value = " ";
        x++;
        
      }
    }
    document.querySelector('.p-tag').innerHTML=' ';
    document.querySelector('.p-tag').classList.remove('active');
  }
