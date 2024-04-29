import './App.css';
import AirportListScreen from './component/Layout/AirportScreen.jsx';
import Screen1Layout from './component/Layout/ScreenLayout.jsx';

function App() {
  return (
    <div style={{margin:"40px"}} className='flex-col align-center justify-center'>
      <Screen1Layout/>
      <AirportListScreen/>
    </div>
  );
}

export default App;
