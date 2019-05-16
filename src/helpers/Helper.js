
getDefaultBoard() {
  let board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ]

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j] = this.getBoardData(Players.First);
    }
  }

  for (let i = 6; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      board[i][j] = this.getBoardData(Player.Second);
    }
  }

  return board;
}