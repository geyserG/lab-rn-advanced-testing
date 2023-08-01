import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.gameBoard}>
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

type SquareProps = {
  value: string;
  onPress: () => void;
};

function Square({value, onPress}: SquareProps) {
  return (
    <TouchableOpacity testID="square" style={styles.square} onPress={onPress}>
      <Text>{value}</Text>
    </TouchableOpacity>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: string[];
  onPlay: (nextSquares: string[]) => void;
};

const Board = ({xIsNext, squares, onPlay}: BoardProps) => {
  function handleSquarePress(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <View testID="board" style={styles.board}>
      <Text testID="status" style={styles.status}>
        {status}
      </Text>
      <View style={styles.row}>
        <Square value={squares[0]} onPress={() => handleSquarePress(0)} />
        <Square value={squares[1]} onPress={() => handleSquarePress(1)} />
        <Square value={squares[2]} onPress={() => handleSquarePress(2)} />
      </View>
      <View style={styles.row}>
        <Square value={squares[3]} onPress={() => handleSquarePress(3)} />
        <Square value={squares[4]} onPress={() => handleSquarePress(4)} />
        <Square value={squares[5]} onPress={() => handleSquarePress(5)} />
      </View>
      <View style={styles.row}>
        <Square value={squares[6]} onPress={() => handleSquarePress(6)} />
        <Square value={squares[7]} onPress={() => handleSquarePress(7)} />
        <Square value={squares[8]} onPress={() => handleSquarePress(8)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  gameBoard: {},
  board: {},
  status: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 50,
    height: 50,
    borderWidth: 1,
    margin: 2,
    borderColor: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
