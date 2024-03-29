import { useState, useEffect } from 'react'

function SudokuManageNew(props) {
  const [sudokuData, setSudokuData] = useState(null)
  const [sudokuSolvedData, setSudokuSolvedData] = useState(null)

  //get solved sudoku data
  useEffect(() => {
    if (sudokuData !== null) {
      //debugger;
      let dataJson = JSON.stringify(sudokuData)
      const asyncPostCall = async () => {
        try {
          const response = await fetch(props.sudokuSolve_Url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: dataJson,
          })
          const data = await response.json()
          setSudokuSolvedData(data)
        } catch (error) {
          // enter your logic for when there is an error (ex. error toast)
          console.log('Error fetching data:', error)
        }
      }

      asyncPostCall()
    }
  }, [sudokuData])

  useEffect(() => {
    if (sudokuSolvedData !== null) {
      //debugger;
      props.callback({ sudokuSolvedData })
    }
  }, [props, sudokuSolvedData])

  const solve_sudokuPressed = () => {
    setSudokuData(props.sudokuData)
  }

  return (
    <div className="">
      <button
        type="button"
        className="bg-lime-500 hover:bg-lime-600 m-0.5 py-1 px-2 text-white rounded border-1 border-yellow-400"
        onClick={solve_sudokuPressed}
      >
        Solve Sudoku
      </button>
    </div>
  )
}
export default SudokuManageNew
