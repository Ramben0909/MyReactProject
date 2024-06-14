import React from 'react';
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import Basic from './layout/Basic';
import Home from './pages/Home';
import About from './pages/About'; // Add other pages here
import Contacts from './pages/Contacts';
import NotFound from './pages/Notfound';

const routes = createRoutesFromElements(
  <Route path='/' element={<Basic />}>
    <Route index element={<Home />} />
    <Route path='/about' element={<About />} />  // Add routes for other pages
    <Route path='/Contacts' element={<Contacts />} />
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
