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
import InstructorRegistration from './pages/InstructorRegistration';
import TraineeRegistration from './pages/TraineeRegistration';
import WebsitePolicy from './components/WebsitePolicy';
import InstructorSecondContract from './pages/InstructorSecondContract';
import ForgotMyPassword from './pages/ForgotMyPassword';
import EditACourse from './components/EditACourse';
import CreateExam from './components/CreateExam';
import EditbioOrEmail from './components/EditbioOrEmail';



// Lydo's stuff
import InstructionEarnings from './pages/InstructorEarnings';

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
              <Route path='/InstructorRegistration' element={<InstructorRegistration />}/>
              <Route path='/TraineeRegistration' element={<TraineeRegistration />}/>
              
              <Route path='/WebsitePolicy' element={<WebsitePolicy />}/>
              <Route path='/InstructorSecondContract' element={<InstructorSecondContract />}/>

              <Route path='/ForgotMyPassword' element={<ForgotMyPassword />}/>
              <Route path='/EditACourse' element={<EditACourse />}/>
              <Route path='/CreateExam' element={<CreateExam />}/>
              <Route path='/EditbioOrEmail' element={<EditbioOrEmail />}/>


              {/* Lydo's stuff*/}
              <Route path='/myEarnings' element={<InstructionEarnings/>}/>



       




              <Route path='/Guest' element={<Guest />}/>
            </Routes>
          </div>
      </Router>
      <ToastContainer />
    </>
    
  );
}

export default App;
