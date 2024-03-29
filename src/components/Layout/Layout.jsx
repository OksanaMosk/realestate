// import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { selectAuthenticated } from 'redux/auth/auth.selectors';
// import { selectUserData } from 'redux/auth/auth.selectors';
// import { logOutThunk } from 'redux/auth/auth.reducer';
import zillow from '../images/iconZillow.png';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  // const userData = useSelector(selectUserData);
  // const location = useLocation();
  // const dispatsh = useDispatch();
  // const authenticated = useSelector(selectAuthenticated);

  // const onLogOut = () => {
  //   dispatsh(logOutThunk());
  // };

  return (
    <div className={css.mainTitleContainer}>
      <header>
        <div className={css.links}>
          <NavLink
            className={css.toLink}
            // state={{ from: location }}
            to="/buy"
          >
            buy
          </NavLink>
          <NavLink
            className={css.toLink}
            // state={{ from: location }}
            to="/rent"
          >
            rent
          </NavLink>
        </div>
        <div className={css.mainTit}>
          <h1 className={css.mainTitle}>
            <img
              src={zillow}
              alt="zillow"
              style={{ width: '40px', height: '40px' }}
            />
            Realestate
          </h1>
        </div>

        {/* {authenticated ? (
          <>
            <div className={css.menu}>
              <NavLink state={{ from: location }} to="/"></NavLink>

              <NavLink
                state={{ from: location }}
                className={css.title}
                to="/add"
              >
                Add contact
              </NavLink>
              <NavLink
                state={{ from: location }}
                className={css.title}
                to="/contacts"
              >
                My contacts
              </NavLink>
            </div>
            <span className={css.nameLogOutButton}>Hello, {userData.name}</span>
            <button className={css.logOutButton} onClick={onLogOut}>
              Log out
            </button>
          </>
        ) : (
          <div className={css.authorization}>
            <NavLink
              state={{ from: location }}
              className={css.titleAuthorization}
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              state={{ from: location }}
              className={css.titleAuthorization}
              to="/login"
            >
              Login
            </NavLink>
          </div>
        )} */}
      </header>

      <main>{children}</main>
    </div>
  );
};
export default Layout;
