import { Route, Routes } from "react-router-dom";

function App(){
return(
  <>
    <nav>
      
    </nav>
    <Routes>
      <Route path="/" element={<Login/>}>Login</Route>
    </Routes>
  </>
)
}
export default App;