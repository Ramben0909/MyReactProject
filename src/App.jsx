import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Basic from './layout/Basic';
import Home from './pages/Home';
import About from './pages/About';
import Contacts from './pages/Contacts';
import NotFound from './pages/Notfound';

const routes = createRoutesFromElements(
  <Route path='/' element={<Basic />}>
    <Route index element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/Contacts' element={<Contacts />} />
    <Route path='*' element={<NotFound />} />
  </Route>
);

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
