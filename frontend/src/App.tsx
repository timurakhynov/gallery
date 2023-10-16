import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import PrivateRoute from "./utils/PrivateRoute"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import UserPhotos from "./components/UserPhotos/UserPhotos"
import AddPhoto from "./containers/AddPhoto/AddPhoto"
import Gallery from "./containers/Gallery/Gallery"

const App = () => {
  return (
    <Routes>
      <Route element={<Layout/>} >
        <Route path='/' element={<Gallery/>} />
        <Route path='/gallery' element={<UserPhotos/>} />
        <Route element={<PrivateRoute/>}>
          <Route path='/add-photo' element={<AddPhoto/>}/>
        </Route>
        <Route path={"/login"} element={<Login/>} />
        <Route path={"/register"} element={<Register/>} />
        <Route path='*' element={<div>NOT FOUND</div>} />
      </Route>
    </Routes>
  )
}

export default App
