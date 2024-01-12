import React, { useState, useEffect } from 'react'
import { Empty2DArray } from './support/functions.js'
// import { Fade } from "react-bootstrap";
import './index.css'

function SudokuGrid(props) {
  // this contain object 2d array
  // 81 objects for each cell in the grid
  const [developerInputs, setDeveloperInputs] = useState('')
  const [sudokuData, setSudokuData] = useState([])
  const [solved_sudokuData, setSolved_sudokuData] = useState([])
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([])
  const [a_sudokuData_exist, set_A_sudokuData_exist] = useState(false)
  const [sudokuName, setSudokuName] = useState('')
  const [gridMode, setGridMode] = useState('view') //Modes- "view","create"
  debugger

  // sudokuData and solved_sudokuData states update from props
  useEffect(() => {
    if (props.sudokuSolvedData.length !== 0) {
      debugger
      let sudoku_data = []
      let sudoku_solvedData = []
      for (let i = 0; i < 9; i++) {
        let sudoku_dataLines = []
        let sudoku_solvedDataLines = []
        for (let j = 0; j < 9; j++) {
          sudoku_solvedDataLines.push(props.sudokuSolvedData[i][j])
          sudoku_dataLines.push(props.sudokuData[i][j])
        }
        sudoku_solvedData.push(sudoku_solvedDataLines)
        sudoku_data.push(sudoku_dataLines)
      }
      debugger
      if (gridMode === 'view') {
        setSolved_sudokuData(sudoku_solvedData)
      }

      setSudokuData(sudoku_data)
    }
  }, [props.sudokuSolvedData])

  useEffect(() => {
    setSudokuData(props.sudokuData)
  }, [props.sudokuData])

  useEffect(() => {
    setGridMode(props.gridMode)
  }, [props.gridMode])

  useEffect(() => {
    if (gridMode === 'create') {
      debugger
      let sudoku_data = developerInputs.split('')
      let data = Empty2DArray()
      if (sudoku_data.length > 1) {
        if (sudoku_data.length % 3 === 0) {
          for (let i = 0; i < sudoku_data.length; i = i + 3) {
            if (
              Number(sudoku_data[i]) !== 0 &&
              Number(sudoku_data[i + 1] !== 0)
            ) {
              data[Number(sudoku_data[i]) - 1][Number(sudoku_data[i + 1]) - 1] =
                Number(sudoku_data[i + 2])
            }
          }
          setSudokuData(data)
          setSolved_sudokuData(data)
        }
      }
    }
  }, [developerInputs])

  //data populated to "advanced_sudokuData" from Props (includes <input> data)
  useEffect(() => {
    debugger
    if (sudokuData !== null) {
      if (sudokuData.length !== 0) {
        debugger
        let sudoku_Data = []
        let developerInputData = ''
        for (let i = 0; i < 9; i++) {
          let advanced_sudokuDataLines = []
          for (let j = 0; j < 9; j++) {
            let className = ''
            let value = 0
            let readOnly = false
            //debugger;
            if (sudokuData[i][j] === 0) {
              if (solved_sudokuData[i][j] === 0) {
                className = ''
                value = sudokuData[i][j]
              } else {
                value = solved_sudokuData[i][j]
                // className = 'bg-info'
                className = ' bg-blue-600 '
                readOnly = true
              }
            } else {
              if (props.gridMode === 'view') {
                value = sudokuData[i][j]
                // className = 'bg-secondary'
                className = 'bg-slate-900 '
                readOnly = true
              } else {
                value = sudokuData[i][j] //add for support developer inputs
                className = ''
                readOnly = false
              }
            }
            if (gridMode !== 'create') {
              developerInputData =
                developerInputData +
                (i + 1).toString() +
                (j + 1).toString() +
                value.toString()
            }
            advanced_sudokuDataLines.push({
              className: className,
              type: 'number',
              min: '0',
              max: '9',
              value: value,
              readOnly: readOnly,
            })
          }
          sudoku_Data.push(advanced_sudokuDataLines)
          //debugger;
        }
        debugger

        setAdvanced_SudokuData(sudoku_Data)
        set_A_sudokuData_exist(true)
        setSudokuName(props.sudokuName)
        setGridMode(props.gridMode)
        if (gridMode !== 'create') {
          setDeveloperInputs(developerInputData)
        }
        if (gridMode === 'create') {
          props.callback({ newSudokuData: sudokuData })
        }
      }
    }
  }, [sudokuData, solved_sudokuData])

  const inputOnChange = (value, i, j) => {
    debugger
    // let sudokuData = [...advanced_sudokuData];
    // sudokuData[i][j].value = Number(value);
    // setAdvanced_SudokuData(sudokuData);
    // if (gridMode === "create") {
    //   props.callback({ advanced_sudokuData: sudokuData });
    // }

    let sudoku_data = [...sudokuData]
    sudoku_data[i][j] = Number(value)
    setSudokuData(sudoku_data)
    setSolved_sudokuData(sudoku_data)
    // if (gridMode === "create") {
    //   props.callback({ newSudokuData: sudoku_data });
    // }
  }
  const nameOnChange = (value) => {
    debugger
    setSudokuName(value)
    props.callbackName({ sudokuName: value })
  }

  const developerInputsOnChange = (value) => {
    setDeveloperInputs(value)
  }
  const inputClassName =
    'border-2 border-slate-100 rounded w-14 text-white m-1 text-center'

  return (
    <div className="flex">
      <div className="">
        <div className="">
          {gridMode === 'create' ? (
            <div>
              <lable for="sudokuName">Name Sukodu </lable>
              <input
                id="sudokuName"
                className=""
                value={sudokuName}
                onChange={(e) => {
                  nameOnChange(e.target.value)
                }}
              />
              {props.developerMode ? (
                <input
                  className="form-control"
                  type="number"
                  value={developerInputs}
                  onChange={(e) => {
                    developerInputsOnChange(e.target.value)
                  }}
                ></input>
              ) : (
                ''
              )}
            </div>
          ) : (
            <h1>{sudokuName}</h1>
          )}
        </div>

        {/* <table className="table table-bordered text-center">
        {advanced_sudokuData.map((sudokuRow, index) => (
          <tr key={index}>
            {sudokuRow.map((cell, cellIndex) => (
              <td key={cellIndex}>
                <input
                  className={cell.className}
                  type={cell.type}
                  min={cell.min}
                  max={cell.max}
                  readOnly={cell.readOnly}
                  value={cell.value}
                  onChange={(e) => {
                    inputOnChange(e.target.value, index, cellIndex)
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </table> */}

        <div className="flex flex-wrap border-2 border-red-800 ">
          {/* first box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][0].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 2)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][0].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 2)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][0].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 2)
                }}
              />
            </div>
          </div>

          {/* 2 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][3].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 5)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][3].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 5)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][3].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 5)
                }}
              />
            </div>
          </div>

          {/* 3 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][6].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[0][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[0][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[0][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 0, 8)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][6].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[1][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[1][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[1][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 1, 8)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][6].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[2][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[2][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[2][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 2, 8)
                }}
              />
            </div>
          </div>

          {/* 4 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][0].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 2)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][0].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 2)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][0].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 2)
                }}
              />
            </div>
          </div>

          {/* 5 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][3].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 5)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][3].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 5)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][3].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 5)
                }}
              />
            </div>
          </div>

          {/* 6 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][6].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[3][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[3][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[3][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 3, 8)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][6].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[4][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[4][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[4][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 4, 8)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][6].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[5][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[5][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[5][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 5, 8)
                }}
              />
            </div>
          </div>

          {/* 7 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][0].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 2)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][0].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 2)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][0].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][0].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][0].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 0)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][1].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][1].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][1].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 1)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][2].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][2].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][2].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 2)
                }}
              />
            </div>
          </div>

          {/* 8 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][3].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 5)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][3].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 5)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][3].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][3].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][3].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 3)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][4].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][4].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][4].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 4)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][5].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][5].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][5].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 5)
                }}
              />
            </div>
          </div>

          {/* 9 box */}
          <div className="flex flex-wrap border-2 border-red-800  w-1/3 p-1">
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][6].className
                    : '') +
                  inputClassName +
                  ''
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[6][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[6][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[6][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 6, 8)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][6].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[7][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[7][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[7][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 7, 8)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][6].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][6].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][6].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 6)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][7].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][7].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][7].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 7)
                }}
              />
            </div>
            <div className="w-1/3">
              <input
                className={
                  (a_sudokuData_exist
                    ? advanced_sudokuData[8][8].className
                    : '') + inputClassName
                }
                type="number"
                min={0}
                max={9}
                value={a_sudokuData_exist ? advanced_sudokuData[8][8].value : 0}
                readOnly={
                  a_sudokuData_exist
                    ? advanced_sudokuData[8][8].readOnly
                    : false
                }
                onChange={(e) => {
                  inputOnChange(e.target.value, 8, 8)
                }}
              />
            </div>
          </div>
        </div>

        {/* <p>sudoku data: {sudokuData}</p> */}
      </div>
    </div>
  )
}

export default SudokuGrid
