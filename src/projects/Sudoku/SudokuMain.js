import React, { useEffect, useState } from 'react'
import ViewAllSudoku from './ViewAllSudoku'
import SudokuGrid from './SudokuGrid'
import SolveSudoku from './SolveSudoku'
import NewSudoku from './NewSudoku'
import './support/index.css'

function SudokuMain(props) {
  const [advanced_sudokuData, setAdvanced_SudokuData] = useState([])
  const [sudokuData, setSudokuData] = useState([])
  const [sudokuName, setSudokuName] = useState('')
  const [newSudokuData, setNewSudokuData] = useState([])
  const [sudokuSolvedData, setSudokuSolvedData] = useState([])
  const [gridMode, setGridMode] = useState('view') //Modes- "view","create"
  const [showSave, setShowSave] = useState(false)
  const [apiUrls, setApiUrls] = useState(props.apiUrls)
  const [sudokuList, setSudokuList] = useState([])
  const [last_sudokuId, setLast_sudokuId] = useState('')

  const [sudokuCreatedData, setSudokuCreatedData] = useState({})

  useEffect(() => {
    debugger
    if (sudokuData !== null) {
      if (sudokuData.length !== 0) {
        setSudokuSolvedData(sudokuData)
      }
    }
  }, [sudokuData])

  const updateSudokuData = (params) => {
    //view sudoku
    debugger
    setSudokuData(params['sudokuData'])
    setSudokuName(params['sudokuName'])
    setSudokuSolvedData(params['sudokuData'])
    setGridMode(params['gridMode'])
    setShowSave(params['showSave'])
  }
  const updateSudokuSolvedData = (params) => {
    //solve sudoku pressed
    //debugger;
    setSudokuSolvedData(params['sudokuSolvedData'])
  }
  const newSudokuPressed = (params) => {
    //new Sudoku pressed
    debugger
    //setAdvanced_SudokuData(params["advanced_sudokuData"]);
    setSudokuSolvedData(params['sudokuData'])
    setSudokuData(params['sudokuData'])
    setSudokuName(params['sudokuName'])
    setGridMode(params['gridMode'])
    setShowSave(params['showSave'])
  }
  const updateStatusfmGrid = (params) => {
    debugger
    //let sudokuData = [];
    // for (let i = 0; i < 9; i++) {
    //   let sudokuDataLines = [];
    //   for (let j = 0; j < 9; j++) {
    //     sudokuDataLines.push(params["advanced_sudokuData"][i][j].value);
    //   }
    //   sudokuData.push(sudokuDataLines);
    // }
    setNewSudokuData(params['newSudokuData'])
  }
  const updateSudokuNameFmGrid = (params) => {
    debugger
    setSudokuName(params['sudokuName'])
  }

  const afterNewSudokuCreated = (params) => {
    setSudokuCreatedData(params)
    // setSudokuList(params["sudokuList"]);
    // setLast_sudokuId(params["last_sudokuId"]);
  }

  return (
    <div className="sudoku_container">
      <div className="flex flex-wrap">
        <div className="lg:w-1/2 sm:w-2/3 xxs:w-full xxxs:w-full">
          <SudokuGrid
            developerMode={props.developerMode}
            callback={updateStatusfmGrid}
            callbackName={updateSudokuNameFmGrid}
            sudokuData={sudokuData}
            sudokuName={sudokuName}
            sudokuSolvedData={sudokuSolvedData}
            advanced_sudokuData={advanced_sudokuData}
            gridMode={gridMode}
          />
        </div>
        <div className="lg:w-1/3 lg:mx-4 lg:my-14 sm:1/3 sm:mx-6 sm:my-8">
          <SolveSudoku
            callback={updateSudokuSolvedData}
            sudokuData={sudokuData}
            sudokuSolve_Url={apiUrls.sudokuSolve_Url}
          />
          <NewSudoku
            callback={newSudokuPressed}
            callback_afterNewSudokuCreated={afterNewSudokuCreated}
            newSudokuData={newSudokuData}
            sudokuName={sudokuName}
            showSave={showSave}
            sudokuSave_Url={apiUrls.sudokuSave_Url}
          />
        </div>
      </div>

      <div className="p-3 col-sm">
        <h3>Saved Grids</h3>
        <ViewAllSudoku
          callback={updateSudokuData}
          sudokuList_Url={apiUrls.sudokuList_Url}
          sudokuData={sudokuData}
          gridMode={gridMode}
          sudokuCreatedData={sudokuCreatedData}
          // sudokuList={sudokuList}
          // last_sudokuId={last_sudokuId}
        />
      </div>
    </div>
  )
}
export default SudokuMain
