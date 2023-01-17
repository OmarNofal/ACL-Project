import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AdminHome from './pages/AdminHome';
import Guest from './pages/Guest';
import InstructorHome from './pages/InstructorHome';
import IndividualTrainee from './pages/IndividualTrainee';
import CorporateTrainee from './pages/CorporateTrainee';
import ViewAllcoursesforcorporatetrainee from './components/ViewAllcoursesforcorporatetrainee';
import ViewAllCoursesForINSorTRAINEEorGUEST from './components/ViewAllCoursesForINSorTRAINEEorGUEST';
import AddAnotherInstructor from './components/AddAnotherInstructor';
import AddAnotherAdmin from './components/AddAnotherAdmin';
import AddAnotherCorporateTrainee from './components/AddAnotherCorporateTrainee';
import AddNewCourse from './components/AddNewCourse';
import ViewInstructorCourse from './components/ViewInstructorCourse';
import MyCourses from './components/MyCourses';
import Quiz from './pages/Quiz'
import ViewUnseenReportsAdmin from './components/ViewUnseenReportsAdmin'
import ViewRequestRefundAdmin from './components/ViewRequestRefundAdmin'
import ViewCorporateRequests from './components/ViewCorporateRequests'
function App() {
  return (
    <>
      <Router>
          <div className='container' >
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />}/>
              <Route path='/Login' element={<Login />}/>
              <Route path='/Register' element={<Register />}/>
              <Route path='/AdminHome' element={<AdminHome />}/>
              <Route path='/InstructorHome' element={<InstructorHome />}/>
              <Route path='/IndiviualTrainee' element={<IndividualTrainee />}/>
              <Route path='/CorporateTrainee' element={<CorporateTrainee />}/>
              <Route path='/ViewAllcoursesforcorporatetrainee' element={<ViewAllcoursesforcorporatetrainee />}/>
              <Route path='/ViewAllCoursesForINSorTRAINEEorGUEST' element={<ViewAllCoursesForINSorTRAINEEorGUEST />}/>
              <Route path='/AddAnotherInstructor' element={<AddAnotherInstructor />}/>
              <Route path='/AddAnotherAdmin' element={<AddAnotherAdmin />}/>
              <Route path='/AddAnotherCorporateTrainee' element={<AddAnotherCorporateTrainee />}/>
              <Route path='/AddNewCourse' element={<AddNewCourse />}/>
              <Route path='/ViewInstructorCourse' element={<ViewInstructorCourse />}/>
              <Route path='/MyCourses' element={<MyCourses />}/>
              <Route path='/Quiz' element={<Quiz />}/>
              <Route path='/ViewUnseenReportsAdmin' element={<ViewUnseenReportsAdmin />}/>
              <Route path='/ViewRequestRefundAdmin' element={<ViewRequestRefundAdmin />}/>
              <Route path='/ViewCorporateRequests' element={<ViewCorporateRequests />}/>
              

              <Route path='/Guest' element={<Guest />}/>
            </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
    
  );
}

export default App;
