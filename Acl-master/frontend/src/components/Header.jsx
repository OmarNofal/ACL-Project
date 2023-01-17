import { FaSignInAlt,FaUserSecret, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'></Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
          <li>
              <Link to='/guest'>
                <FaUserSecret /> continue as guest
              </Link>
            </li>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/TraineeRegistration'>
                <FaUser /> Trainee Registerion
              </Link>
            </li>
            <li>
              <Link to='/InstructorRegistration'>
                <FaUser /> Instructor Registerion
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header