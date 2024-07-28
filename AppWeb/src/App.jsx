import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/taskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState('CLP');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('https://v6.exchangerate-api.com/v6/30f1158b553f63c3e8f4d596/latest/USD'); // Reemplaza YOUR_API_KEY con tu clave de API real
        setRates(response.data.conversion_rates || {});
      } catch (error) {
        console.error('Error fetching exchange rates', error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="App">
      <h1>Task List</h1>
      <TaskForm rates={rates} setTasks={setTasks} currency={currency} setCurrency={setCurrency} />
      <div className="task-list">
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <h3>{task.name}</h3>
              <p>Steps: {task.steps.join(', ')}</p>
              <p>Cost: {task.cost} {task.currency}</p>
              {task.convertedCost && (
                <p>Converted Cost: {task.convertedCost} {task.targetCurrency}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;