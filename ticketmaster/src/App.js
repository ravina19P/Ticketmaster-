import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import LogIn from './Components/LogIn/LogIn';
import Department from './Components/Department/Department';
import Employee from './Components/Employee/Employee';
import Leaves from './Components/Leaves/Leaves';
import Tickets from './Components/Tickets/Tickets';
import Dashboard from './Components/Dashboard/Dashboard';
import NewTickets from './Components/Tickets/NewTickets';
import Default from './Components/Other/Default';
import LeaveAproval from './Components/Leaves/LeaveAproval';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path='/' element={<Default/>} />
        {/* <Route path='/' element={<LogIn/>} /> */}
        <Route path='/Dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='/LogIn' element={<LogIn></LogIn>}></Route>
        <Route path='/Department' element={<Department></Department>}></Route>
        <Route path='/Employee' element={<Employee></Employee>}></Route>
        <Route path='/Leaves' element={<Leaves></Leaves>}></Route>
        <Route path='/LeaveAproval' element={<LeaveAproval></LeaveAproval>}></Route>
        <Route path='/Tickets' element={<Tickets></Tickets>}></Route>
        <Route path='/New-Tickets' element={<NewTickets></NewTickets>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
