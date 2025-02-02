import React, { useState } from "react";
import { FaWindowClose } from "react-icons/fa";

import './App.css';


function App() {
  const [showCard, setShowCard] = useState(false)
  const [response, setResponse] = useState('')
  const [radioOptions, setRadioOptions] = useState({
    option1: false,
    option2: false,
    option3: false
  })


  const {option1, option2, option3 } = radioOptions

  const closeModal = () => {
    setShowCard(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(name === 'option1') {
      setResponse(value)
      setRadioOptions({option1: true, option2: false, option3: false})
    }
    if(name === 'option2') {
      setResponse(value)
      setRadioOptions({option1: false, option2: true, option3: false})
    }
    if(name === 'option3') {
      setResponse(value)
      setRadioOptions({option1: false, option2: false, option3: true})
    }
  }

  const handleSubmit = (e) => {
    console.log(e)
    e.preventDefault()
    setShowCard(true)

    /**
     * trigger confetti
     */
  }
  return (
  <div className="container">
      <h1>Hey My Beautiful buttercup! I have a question.</h1>

      <div className="card">
        <div class="from-stamp-wrapper">
          <p>From your Bun Bun</p>
          <p>💜</p>
        </div>

        <h2>Will you by my Valentine?</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="option1">
            <input id="option1" name="option1" value="yes"  type="radio" onChange={handleChange} checked={option1} />
            YES!
          </label>
          <label htmlFor="option2">
            <input id="option2" name="option2" value="Absolutely yes!"  type="radio" onChange={handleChange} checked={option2} />
            Absolutely Yes!
          </label>
          <label htmlFor="option3">
            <input id="option3" name="option3" value="I would love to!"  type="radio" onChange={handleChange} checked={option3} />
            I Would Love to!
          </label>

          <button disabled={false} className="btn btn-default" type="submit">
            Submit
          </button>
      </form>

      </div>

      {showCard &&
        <div className="response-card">
          <button className="response-close" onClick={closeModal}>
            <FaWindowClose />
          </button>
          <p className="response-text"> She said: <span>{response}</span></p>
          {option1 &&
            <div className='response-img-1'></div>
          }

          {option2 &&
            <div className='response-img-2'></div>
          }

          {option3 &&
            <div className='response-img-3'></div>
          }

        </div>
      }
  </div>
  );
}

export default App;
