import React, { useState, useEffect } from "react";

const App = () => {
  const tableSize = 5;
  const [greenCell, setGreenCell] = useState({ row: 0, col: 0 });
  const [blueCell, setBlueCell] = useState({ row: 0, col: 0 });
  const [redCell, setRedCell] = useState(null);
  const [inputValue, setInputValue] = useState("");
  console.log(inputValue);

  useEffect(() => {
    const initializeGreenCell = () => {
      const randomRow = Math.floor(Math.random() * tableSize);
      const randomCol = Math.floor(Math.random() * tableSize);
      setGreenCell({ row: randomRow, col: randomCol });
    };
    initializeGreenCell();
  }, []);

  const handleInput = (e) => {
    setInputValue(e.target.value.trim().toLowerCase());
  };

  const processMovement = () => {
    let currentRow = blueCell.row;
    let currentCol = blueCell.col;

    for (const move of inputValue) {
      console.log(move);
      if (move === "t" && currentRow > 0) currentRow--;
      else if (move === "l" && currentCol > 0) currentCol--;
      else if (move === "r" && currentCol < tableSize - 1) currentCol++;
      else if (move === "b" && currentRow < tableSize - 1) currentRow++;
      else {
        alert(`bunday harakat yo'q: ${move}`);
        return;
      }
    }

    setBlueCell({ row: currentRow, col: currentCol });

    if (currentRow === greenCell.row && currentCol === greenCell.col) {
      setGreenCell(null);
      setRedCell({ row: currentRow, col: currentCol });
    }
    setInputValue("");
  };

  const resetGreenCell = () => {
    if (redCell) {
      setRedCell(null);
    }
    setGreenCell(blueCell);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-gray-800">
      <div className="mt-6 flex flex-col items-center mb-5">
        <label
          htmlFor="movementInput"
          className="mb-2 text-center text-2xl font-semibold font-myFont"
        >
          Harakatlarni kiriting <br /> t = top, b = bottom, l = left, r = right
        </label>
        <div className="flex space-x-3 items-center">
          <input
            id="movementInput"
            type="text"
            value={inputValue}
            onChange={handleInput}
            placeholder="t b l r "
            className="px-4 py-2 text-[22px] border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
          />
          <button
            onClick={processMovement}
            className="px-4 py-2 rounded-xl text-[22px]  text-balck border"
          >
            harakatlantir
          </button>
          {redCell && (
            <button
              onClick={resetGreenCell}
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              qo'sh
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6">
        {Array.from({ length: tableSize }).map((_, rowIdx) =>
          Array.from({ length: tableSize }).map((_, colIdx) => (
            <span
              key={`${rowIdx}-${colIdx}`}
              className={`w-12 h-12 border rounded-full ${
                greenCell?.row === rowIdx && greenCell?.col === colIdx
                  ? "bg-white border-4 border-black "
                  : blueCell.row === rowIdx && blueCell.col === colIdx
                  ? "bg-purple-950"
                  : redCell?.row === rowIdx && redCell?.col === colIdx
                  ? "bg-red-800"
                  : "bg-gray-600"
              }`}
            ></span>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
