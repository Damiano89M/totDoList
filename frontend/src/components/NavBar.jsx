import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      <nav className="container">
        <ul className="row justify-content-center text-center p-2 nav-row">
          {
            user &&
            <li className="col-2 nav-link">
              <NavLink
                className='nav-link'
                style={({ isActive }) => {
                  return {
                    borderBottom: isActive ? "solid 1px" : "inherit",
                  };
                }}
                to='/lists'>
                List
              </NavLink>
            </li>
          }

          <li className="col-2 nav-link">
            <NavLink
              className='nav-link'
              style={({ isActive }) => {
                return {
                  borderBottom: isActive ? "solid 1px" : "inherit",
                };
              }}
              to='/'>
              Todo
            </NavLink>
          </li>

          {
            !user &&
            <>
              <li className="col-2 nav-link">
                <NavLink
                  className='nav-link'
                  style={({ isActive }) => {
                    return {
                      borderBottom: isActive ? "solid 1px" : "inherit",
                    };
                  }}
                  to='/register'>
                  Registrati
                </NavLink>
              </li>

              <li className="col-2 nav-link">
                <NavLink
                  className='nav-link'
                  style={({ isActive }) => {
                    return {
                      borderBottom: isActive ? "solid 1px" : "inherit",
                    };
                  }}
                  to='/login'>
                  Accedi
                </NavLink>
              </li>
            </>
          }

          {
            user &&
            <>
            <li className='col-2'> {user.name}</li>
            <li className='col-2 '>
              <NavLink
                to='/logout'
                className='nav-link'
              >
                Logout
              </NavLink>
            </li>
            </>
          }

        </ul>
        <hr />
      </nav>
    </>
  )
}

export default NavBar
