import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../app/apiUser';

import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

import Search from './Search';
import Logo from "../assets/logo.png";

function Header() {
  const { user } = useSelector(state => state.app);

  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutUser();
      const { logout } = await import("../app/appSlice");
      dispatch(logout());
    }catch(err){
      const errorMessage = err?.data?.message || "Coś poszło nie tak. Spróbuj ponownie później.";
      window.alert(errorMessage);
    }
  }

  return (
    <header className="header">
      <div className="logo__wrapper"><Link className="logo" to="/"><img src={Logo} alt="Logo" /></Link></div>
      <nav className="navbar">
        {user ? (
          <>
            <Link className="navbar__link" to="/user"><FaRegUser className="icon" /> {user.username}</Link>
            <button className="navbar__link" onClick={logoutHandler}><FiLogOut className="icon" /> Wyloguj się</button>
          </>
        ) : (
          <>
            <Link className="navbar__link" to="/auth"><FiLogIn className="icon" /> Zaloguj się</Link>
          </>
        )}
      </nav>
      <Search unit={user?.unit || "metric"} />
    </header>
  )
}

export default Header