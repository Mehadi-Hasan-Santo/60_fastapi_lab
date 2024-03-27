import React, { useState, useEffect } from 'react';
import './App.css';

function TextBox({ id, onDelete, onChange }) {
  const [error, setError] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    onChange(id, value);
  }, [id, value, onChange]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue)) {
      setError(false);
      setValue(parseInt(inputValue));
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleChange}
        className={error ? 'invalid' : ''}
      />
      <button onClick={() => onDelete(id)}>Delete</button>
      {error && <p className="error">Please enter a valid number.</p>}
    </div>
  );
}

function App() {
  const [textBoxes, setTextBoxes] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    calculateSum();
  }, [textBoxes]);

  const handleAddTextBox = () => {
    const newTextBoxes = [...textBoxes, { id: Date.now(), value: 0 }];
    setTextBoxes(newTextBoxes);
  };

  const handleDeleteTextBox = (id) => {
    const updatedTextBoxes = textBoxes.filter((textBox) => textBox.id !== id);
    setTextBoxes(updatedTextBoxes);
  };

  const handleTextBoxChange = (id, value) => {
    const updatedTextBoxes = textBoxes.map((textBox) =>
      textBox.id === id ? { ...textBox, value: value } : textBox
    );
    setTextBoxes(updatedTextBoxes);
  };

  const calculateSum = () => {
    const total = textBoxes.reduce((acc, curr) => {
      if (!isNaN(curr.value)) {
        return acc + curr.value;
      } else {
        return acc;
      }
    }, 0);
    setSum(total);
  };

  return (
    <div className="App">
      <h1>TextBoxes with Sum</h1>
      <button onClick={handleAddTextBox}>Add TextBox</button>
      {textBoxes.map((textBox) => (
        <TextBox
          key={textBox.id}
          id={textBox.id}
          onDelete={handleDeleteTextBox}
          onChange={handleTextBoxChange}
        />
      ))}
      <div>Total: {sum}</div>
    </div>
  );
}

export default App;
