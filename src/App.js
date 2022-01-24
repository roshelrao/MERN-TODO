import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import TaskList from './components/TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<TaskList/>}/>
      </Routes>
    </Router>
  );
}

export default App;
