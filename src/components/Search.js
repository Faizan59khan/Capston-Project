import React, { useState, useEffect } from 'react'
import './Search.scss';
import { useAuthContext } from '../hooks/useAuthContext';



const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function Search() {

  const [alert, setAlert] = useState(false);
  const [isListening, setIsListening] = useState(false)
  const [value, setValue] = useState("");
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])
  const { dispatch } = useAuthContext();

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSearch = () => {
    setSavedNotes([...savedNotes, note])
    setValue(note)
  
    if (note.includes("biryani") || note.includes("burger") || note.includes("pizza")
      || note.includes("pulao")) {
      //console.log("yes")                                                      //if the speech value contains these inputs
      dispatch({ type: 'Filter', payload: null })
      dispatch({ type: 'Search', payload: note })
    }
    else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false)
      }, 3000)
      dispatch({ type: 'Filter', payload: null })
      dispatch({ type: 'Search', payload: null })
    }

    console.log(typeof (value));
    setNote('')
  }

  const handleValue = () => {                                               //through text search
    console.log(value);
   // value=value.toLowerCase();
    if (value.includes("biryani") || value.includes("burger") || value.includes("pizza")
      || value.includes("pulao")) {
      dispatch({ type: 'Filter', payload: null })
      dispatch({ type: 'Search', payload: value })
    }
    else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false)
      }, 3000)
      dispatch({ type: 'Filter', payload: null })
      dispatch({ type: 'Search', payload: null })
    }
  }

  return (
    <>
      <div className="alert alert-primary" style={{ display: alert ? 'block' : 'none' }} role="alert">
        <p>No items Found</p>
      </div>


      <div className='d-flex search-input'>
        <input id='sea-inp' type="form-control me-2" placeholder={value ? value : "Search"} onChange={(e) => setValue(e.target.value)} />
        <div className="search">
          <div className="box">

            <button id='voice-btn' onClick={() => setIsListening(prevState => !prevState)}>
              {isListening ? <span><i class="fa-solid fa-microphone"></i></span> : <span><i class="fa-solid fa-microphone-slash"></i></span>}
            </button>
          </div>
        </div>
        <button className="btn btn-outline-success" onClick={note ? handleSearch : handleValue} >Search</button>
      </div>
    </>
  )
}

export default Search