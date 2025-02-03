import React, { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import { motion } from "framer-motion";

import './App.css';


function App() {
  const [running, setRunning] = useState(false);
  const [hearts, setHearts] = useState([]);

  const [showCard, setShowCard] = useState(false)
  const [response, setResponse] = useState('')
  const [radioOptions, setRadioOptions] = useState({
    option1: false,
    option2: false,
    option3: false
  })
  const {option1, option2, option3 } = radioOptions


  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        const id = Date.now();
        setHearts((prev) => [...prev, { id, left: Math.random() * 100, duration: Math.random() * 5 + 3 }]);
        setTimeout(() => {
          setHearts((prev) => prev.filter((heart) => heart.id !== id));
        }, 7000);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);



  const closeModal = () => {
    setShowCard(false)
    setRunning((prev) => !prev)
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
  }
  return (
  <div className="container">
    <div className="hearts-container">
       {hearts.map((heart) => (
        <motion.img
          key={heart.id}
          src="https://pngimg.com/uploads/heart/heart_PNG51335.png"
          className="relative"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -window.innerHeight }}
          exit={{ opacity: 0 }}
          transition={{ duration: heart.duration, ease: "linear" }}
          style={{ left: `${heart.left}vw`, width: 20 }}
        />
      ))}
      </div>
    <div className="typewriter">
      <h1>Hey My Beautiful Buttercup! I have a question.</h1>
    </div>

    <div className="card">
      <div className="from-stamp-wrapper">
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

        <button
          disabled={false}
          className="btn btn-default"
          type="submit"
          onClick={() => setRunning((prev) => !prev)}
        >
          Submit
        </button>
    </form>

    </div>

    {showCard &&
      <div className="response-card">
        <button
          className="response-close" onClick={closeModal}
            >
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
