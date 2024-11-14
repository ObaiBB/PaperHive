
import './App.css'
import Header from './Components/Header'
import Search from './Components/Search'
import Description from './Components/Description'
import Home from './Pages/Home'
import TopReads from './Pages/TopReads'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Paraphrase from './Pages/Paraphrase'
import Interests from './Pages/Interests'
import Profile from './Pages/Profile'
import SearchResults from './Pages/SearchResults'
import Graph from './Pages/Graph'
import Favorites from './Pages/Favorites'
import History from './Pages/History'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Paper } from './Pages/Paper'


function App() {
  
  return (
    <>
      <Router>
        
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/topreads" element={<TopReads/>} />
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/paraphrase" element={<Paraphrase/>} />
            <Route exact path="/register" element={<Register/>} />
            <Route exact path="/interests" element={<Interests/>} />
            <Route exact path="/profile/:id" element={<Profile/>} />
            <Route exact path="/results" element={<SearchResults/>} />
            <Route path="/paper/:id" shouldRevalidate={true} element={<Paper/>} />
            <Route exact path="/graph/:id" element={<Graph/>} />
            <Route exact path='/favorites/:id' element={<Favorites/>} /> 
            <Route exact path='/history/:id' element={<History/>} />

        </Routes>
      </Router>
    </>
)}

export default App
