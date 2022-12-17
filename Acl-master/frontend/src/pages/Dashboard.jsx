import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//import GoalForm from '../components/GoalForm'
//import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
//import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)
  
  useEffect(() => {
    
    
    if (!user) {
      navigate('/login')
    }


  }, [user, navigate])

  
  return (
    <>
      <div>Dashborad</div>
    </>
  )
}

export default Dashboard