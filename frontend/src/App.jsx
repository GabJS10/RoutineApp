import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import Register from "./pages/RegisterPager";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import UserPage from "./pages/User";
import RoutinesPage from "./pages/Routines";
import RoutinePage from "./pages/RoutinePage";
import ListRecords from "./pages/ListRecords";
import DetailExercisePage from "./pages/DetailExercisePage";
import CompareSelectPage from "./pages/CompareSelectPage";
import ComparePage from "./pages/ComparePage";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Home />}>
              <Route index element={<RoutinesPage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="routine/:id" element={<RoutinePage />} />
              <Route path="routine/:rid/day/:did" element={<ListRecords />} />
              <Route
                path="routine/detailRecordExercise/record/:id"
                element={<DetailExercisePage />}
              />
              <Route path="compare/select" element={<CompareSelectPage />} />
              <Route
                path="routine/compare/:id/:id2"
                element={<ComparePage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
