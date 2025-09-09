
import './App.css';
import Applink from './Components/Applink';
import Card from './Components/Card';
import List from './Components/List';
import Login from './Components/Login';
import ThemeButton from './Components/ThemeButton';
import Toggle from './Components/Toggle'
import MainRoute from './Routes/MainRoute';
function App() {
 const user = { name: "lice", age: 19 };
  return (
    <>

    <Applink/>
    <MainRoute/>
    <Login/>
    <List/>
    <Toggle/>
     <Card user={user} />;
    <ThemeButton label="Primary Button" theme="primary" />
    <ThemeButton label="Secondary Button" theme="secondary" />


    
    </>
  );
}

export default App;
