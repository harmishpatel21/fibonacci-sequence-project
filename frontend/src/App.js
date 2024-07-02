
import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function App() {
  const [number, setNumber] = useState('');
  const [sequence, setSequence] = useState([]);

  const fetchFibonacci = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/fibonacci', { number: parseInt(number) });
      setSequence(response.data.sequence);
    } catch (error) {
      console.error('Error fetching the Fibonacci sequence:', error);
    }
  };

  const data = {
    labels: sequence.map((_, index) => index),
    datasets: [
      {
        label: 'Fibonacci Sequence',
        data: sequence,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div className="App">
      <h1>Fibonacci Sequence</h1>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Enter a number"
      />
      <button onClick={fetchFibonacci}>Get Fibonacci Sequence</button>
      {sequence.length > 0 && <Line data={data} />}
    </div>
  );
}

export default App;
