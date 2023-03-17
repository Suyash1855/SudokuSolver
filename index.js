

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

  solveSudoku(board);
  console.log(board);
  fillInput();
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
  }