
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Mainroutes from "./Route/Mainroutes";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Navbar />

        {/* Main Content */}
        <Mainroutes/>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}

export default App;
