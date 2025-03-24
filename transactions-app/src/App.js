import TransactionTable from './components/TransactionTable';
import { CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TransactionTable />
    </div>
  );
}

export default App;
