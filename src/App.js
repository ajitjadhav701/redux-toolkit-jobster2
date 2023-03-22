import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Landing, Error, Register } from "./pages";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AllJobs, Profile, SharedLayout, Stats, AddJob, } from "./pages/dashboard";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Stats />} />
          <Route element={<Stats />} />
          <Route path="all-jobs" element={<Stats />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="landing" element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
