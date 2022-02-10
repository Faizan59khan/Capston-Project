import './App.css';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import chartjs from './helpers/chartjs';
import theme from './theme/theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ProductList from './component/ProductList/ProductList'
import UserList from './component/UserList/UserList'
import Main from './layouts/Main/Main';
import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart';
import Navbar from './components/Navbar';
import AdminForm from './components/AdminForm';
import AdminItems from './components/AdminItems';
import Track from './pages/MyOrders/Track';
import ProductDetails from './pages/Products/ProductDetails';
import { useAuthContext } from './hooks/useAuthContext'
import { lazy } from 'react';
import { Suspense } from 'react';

const Dashboard = lazy(() => import('./component/Dashboard/Dashboard'))      //lazy loading



Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

function App() {
  const { user, authIsReady } = useAuthContext()
  //console.log('Hello');
  return (<div className="App">
    <ThemeProvider theme={theme}>
      {authIsReady &&
        <BrowserRouter>
          {user && user.email == "sudofyproject@gmail.com" && <Main />}
          {user && user.email != "sudofyproject@gmail.com" && <Navbar />}
          {!user && <Navbar />}

          <Routes>

            <Route path="/users" element={<UserList />} />
            <Route path="/products" element={<ProductList />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/dashboard" element={
              <Suspense fallback={<><br /><br /><br /><br />Loading....</>}>
                <Dashboard />
              </Suspense>
            } />

            <Route path="/AdminForm" element={<AdminForm />} />

            <Route path="/AdminItems" element={<AdminItems />} />


            <Route path="/cart" element={<Cart />} />
            <Route path="/track" element={<Track />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>

        </BrowserRouter>}
    </ThemeProvider>

  </div>
  );
}

export default App;
