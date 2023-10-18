import { useState } from 'react'
import SudokuMain from './SudokuMain.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

function SudokuRoot() {
  //console.log("App here.");

  ///for sudokuMain
  const api_debug = true //change to true when debugging the API
  const isCloud = true
  const webApiUrl = 'https://supunrathnayake007.pythonanywhere.com'
  const baseApiUrl = api_debug
    ? 'http://127.0.0.1:5000'
    : 'http://192.168.44.15:8080'
  const apiUrl = isCloud ? webApiUrl : baseApiUrl

  const [apiUrls, setApiUrls] = useState({
    sudokuSolve_Url: apiUrl + '/solve-Sudoku',
    sudokuSave_Url: apiUrl + '/create-Sudoku',
    sudokuList_Url: apiUrl + '/get-Sudoku',
  })
  ///end SudokuMain

  return (
    <div className="container">
      <SudokuMain apiUrls={apiUrls} developerMode={true} />
    </div>
  )
}
export default SudokuRoot
