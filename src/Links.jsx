import {Routes, Route} from 'react-router-dom'

// Import Pages
// import Home from './pages/Home'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Gallery from './pages/Gallery'

// import Components
// import Project from './components/Project'

// import SinglePageHome
import SinglePageHome from './pages/SinglePageHome'

const Links = () => {
  return (
    <Routes>
        {/* <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/gallery' element={<Gallery/>}/>
        <Route path='/gallery/:slug' element={<Project />} /> */}

        {/* Single page version of site */}
        <Route exact path='/' element={<SinglePageHome/>}/>

    </Routes>
  )
}

export default Links