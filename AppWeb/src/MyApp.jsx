const App = () => {
    const [tasks, setTasks] = useState([]);
    const [rates, setRates] = useState({});
    const [currency, setCurrency] = useState('CLP');
  
    useEffect(() => {
      const fetchRates = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/rates');
          setRates(response.data.rates);
        } catch (error) {
          console.error('Error fetching exchange rates', error);
        }
      };
  
      fetchRates();
    }, []);
  
    const addTask = (task) => {
      setTasks([...tasks, task]);
    };
  
    return (
      <div className="App">
        <h1>Task List</h1>
        {/* Aquí va el formulario para agregar tareas y la lógica para convertir monedas */}
      </div>
    );
  };
  