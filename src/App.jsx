
import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './Pages/Home/Home'
import About from './Pages/About/About'
function App() {

  return (
    <>
   


     <BrowserRouter>
     {/* <Header /> */}
   
      <Routes>
        <Route  path='/' element={<Home />} />
        <Route  path='/about' element={<About />} />
      </Routes>
      {/* <Footer /> */}
     </BrowserRouter>
    </>
  )
}

export default App
