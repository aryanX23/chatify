import './App.css';
import Register from './components/register/register';
import SignIn from './components/signIn/signin';
import { Route,Routes } from 'react-router-dom';
function App() {
  return (
    <div className="appBody">
      <Routes>
        <Route exact path='/' element={<SignIn />} />
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </div>
  );
}

export default App;
