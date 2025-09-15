import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import Basic from "./layout/Basic";
import Home from "./pages/Home";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/Notfound";
import MyWatchList from "./pages/MyWatchList";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

const routes = createRoutesFromElements(
  <Route path="/" element={<Basic />}>
    <Route path="/" index element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/movies/:id" element={<About />} />
    <Route path="/contacts" element={<Contacts />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/cart" element={<MyWatchList />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      {/* ✅ Mount toaster globally */}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
