import {Link, NavLink} from 'react-router-dom'
const NavBar = () => {
  return (
    <>
      <nav className="container">
        <ul className="row justify-content-center text-center p-2 nav-row">
            <NavLink className="col-2 nav-link" 
              style={({ isActive}) => {
                return {
                  borderBottom: isActive ? "solid 1px" : "inherit",
                };
              }}  
            to='/lists'>
                <li>List</li>
            </NavLink>
            <NavLink className="col-2 nav-link" 
              style={({ isActive}) => {
                return {
                  borderBottom: isActive ? "solid 1px" : "inherit",
                };
              }} 
            to='/'>
                <li>Todo</li>
            </NavLink>
            <NavLink className="col-2 nav-link" 
              style={({ isActive}) => {
                return {
                  borderBottom: isActive ? "solid 1px" : "inherit",
                };
              }} 
            to='/register'>
                <li>Registrati</li>
            </NavLink>
            
        </ul>
        <hr />
      </nav>
    </>
  )
}

export default NavBar
