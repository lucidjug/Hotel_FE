import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import RoomPage from './pages/RoomPage/RoomPage';
import RoomDetails from './pages/RoomDetails/RoomDetails';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { Dashboard } from './pages/Sidebar/Dashboard';
import DashboardLayout from './components/Layout/DashBoardLayout';
import UserList from './pages/Sidebar/UserList';
import FetchCustomer from './pages/Sidebar/FetchCustomer';
import UserProfile from './pages/Sidebar/UserProfile';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import AdminRoomList from './components/AdminRoomList/AdminRoomList';
import PrivateRoute from './admin/PrivateRoute';
import PublicRoute from './public/PublicRoute'; // Import PublicRoute
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'; // Import NotFoundPage
import AddRoom from './pages/Sidebar/AddRoom';
import FetchRoom from './pages/Sidebar/FetchRoom'
import Report from './pages/Sidebar/Report';
import DiscountEvents from './pages/Sidebar/DiscountEvents';
import Contact from './pages/Contact/Contact';
import BookedRooms from './pages/Sidebar/BookedRooms';
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@mui/material";
import UpdateRoom from './components/UpdateRoom/updateRoom';
import ViewRoom from './components/ViewRoom/viewRoom';

function App() {

  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>

          <Routes>
            {/* Các route khác */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />

            <Route
              path="/contact"
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
            />

            {/* Route cho RoomPage và RoomDetails */}
            <Route
              path="rooms"
              element={
                <Layout>
                  <RoomPage />
                </Layout>
              }
            >
              <Route path=":id" element={<RoomDetails />} />
            </Route>

            {/* Route cho Login và Register */}
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Route cho Dashboard */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/bookedrooms"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <BookedRooms />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* Route cho Profile */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <UserProfile />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* Route cho Admin */}
            <Route
              path="/admin/userlist"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>
                    {/* <FetchCustomer /> */}
                    <UserList />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/roomlist"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>
                    <AdminRoomList />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/addroom"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>

                    {/* <AddRoom /> */}
                    <FetchRoom />

                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/updateRoom/:roomId"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>

                    <UpdateRoom />

                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/viewRoom"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>

                    <ViewRoom />

                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/report"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>
                    <Report />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/events"
              element={
                <PrivateRoute adminOnly={true}>
                  <DashboardLayout>
                    <DiscountEvents />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* Route cho 404 - Bất kỳ đường dẫn nào không khớp */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
