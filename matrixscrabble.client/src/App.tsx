import './App.css';
import AppRouter from './Components/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </div>
    );
}

export default App;
