import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const TaskForm = ({ rates, setTasks, currency, setCurrency }) => {
  const [taskName, setTaskName] = useState('');
  const [steps, setSteps] = useState(['']);
  const [cost, setCost] = useState('');
  const [convertedCost, setConvertedCost] = useState(null);
  const [targetCurrency, setTargetCurrency] = useState('USD');

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
      setTasks(tasks => [...tasks, response.data]);
      setTaskName('');
      setSteps(['']);
      setCost('');
      setConvertedCost(null);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const convertCost = () => {
    if (cost && targetCurrency && rates[targetCurrency]) {
      const converted = (parseFloat(cost) / rates[currency]) * rates[targetCurrency];
      setConvertedCost(converted.toFixed(2));
    }
  };

  return (
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
      <div>
        <label>Convert to:</label>
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {Object.keys(rates).map(rate => (
            <option key={rate} value={rate}>{rate}</option>
          ))}
        </select>
        <button type="button" onClick={convertCost}>Convert</button>
        {convertedCost && (
          <p>Converted Cost: {convertedCost} {targetCurrency}</p>
        )}
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

TaskForm.propTypes = {
  rates: PropTypes.object.isRequired,
  setTasks: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired
};

export default TaskForm;