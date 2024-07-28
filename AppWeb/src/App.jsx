import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [rates, setRates] = useState({});
  const [currency, setCurrency] = useState('CLP');
  const [taskName, setTaskName] = useState('');
  const [steps, setSteps] = useState(['']);
  const [cost, setCost] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rates');
        setRates(response.data.rates || {});
      } catch (error) {
        console.error('Error fetching exchange rates', error);
      }
    };

    fetchRates();
  }, []);

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addTask = async (e) => {
    e.preventDefault();
    const newTask = {
      name: taskName,
      steps: steps.filter(step => step !== ''),
      cost: parseFloat(cost),
      currency
    };
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setTaskName('');
      setSteps(['']);
      setCost('');
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  return (
    <div className="App">
      <h1>Task List</h1>
      <form onSubmit={addTask}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Steps:</label>
          {steps.map((step, index) => (
            <div key={index}>
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addStep}>Add Step</button>
        </div>
        <div>
          <label>Cost:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {Object.keys(rates).map(rate => (
              <option key={rate} value={rate}>{rate}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>

      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <h3>{task.name}</h3>
              <p>Steps: {task.steps.join(', ')}</p>
              <p>Cost: {task.cost} {task.currency}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;