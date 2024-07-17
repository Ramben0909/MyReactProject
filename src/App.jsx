import React from 'react';
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import Basic from './layout/Basic';
import Home from './pages/Home';
import About from './pages/About'; // Add other pages here
import Contacts from './pages/Contacts';
import NotFound from './pages/Notfound';
import Loginpage from './pages/Loginpage';
import MyWatchList from './pages/MyWatchList';

const routes = createRoutesFromElements(
  <Route path='/' element={<Basic />}>
    <Route index element={<Home />} />
    <Route path='/about' element={<About />} /> 
    <Route path='/movies/:id' element={<About />}/> 
    <Route path='/Contacts' element={<Contacts />} />
    <Route path='/login' element={<Loginpage />} />
    <Route path='/cart' element={<MyWatchList />} />
    <Route path='*' element={<NotFound />} />
  </Route>
);

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
