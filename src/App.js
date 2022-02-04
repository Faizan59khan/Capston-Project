import logo from './logo.svg';
import './App.css';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider } from '@material-ui/styles';
import  chartjs  from './helpers/chartjs';
import theme from './theme/theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ProductList from './component/ProductList/ProductList'
import UserList from './component/UserList/UserList'
import Account from './component/Account/Account'
import Settings from './component/Settings/Settings'
import NotFound from './component/NotFound/NotFound'
import  Main from './layouts/Main/Main';
import './App.css';
import Login from './pages/Login/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Admin from './components/Admin';
import AdminForm from './components/AdminForm';
import AdminDeals from './components/AdminDeals';
import AdminItems from './components/AdminItems';
import AdminForm2 from './components/AdminForm2';
import Purchases from './pages/Admin/Purchases';
import Orders from './pages/Admin/Orders';
import Track from './pages/MyOrders/Track';
import ProductDetails from './pages/Products/ProductDetails';
import Apriori from './pages/Products/AprioriAlgo';
import {useAuthContext} from './hooks/useAuthContext'
import {lazy} from 'react';
import {Suspense} from 'react';
const Dashboard= lazy(()=> import  ('./component/Dashboard/Dashboard'))


Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

function App() {
  const {user,authIsReady}=useAuthContext()
  return ( <div className="App">
    <ThemeProvider theme={theme}>
      {authIsReady &&
<BrowserRouter>
{user && user.email=="sudofyproject@gmail.com" && <Main/>}
{user && user.email!="sudofyproject@gmail.com" && <Navbar />}
{!user && <Navbar />}

        <Routes>
          
           {user && <Route  path="/users" element ={<UserList/>}/>}
           {user && <Route  path="/products" element ={<ProductList/>}/>}
           {user && <Route  path="/account" element ={<Account/>}/>}
           {user && <Route  path="/settings" element ={<Settings/>}/>}
           {user && <Route path="*" element={<NotFound/>} />}
            <Route exact path="/" element={<Home/>} />
           {user && <Route  path="/dashboard" element ={
             <Suspense fallback={<><br/><br/><br/><br/>Loading....</>}>
               <Dashboard />
             </Suspense>
           }/>}
           {user && <Route path="/admin" element={<Admin/>} />}
           {user && <Route path="/AdminForm" element={<AdminForm/>} />}
           {user && <Route path="/AdminDeals" element={<AdminDeals/>} />}
           {user && <Route path="/AdminItems" element={<AdminItems/>} />}
           {user && <Route path="/AdminForm2" element={<AdminForm2/>} />}

              <Route path="/cart" element={<Cart/>} />
           {user && <Route path="/purchases" element={<Purchases/>} />}
           {user && <Route path="/order" element={<Orders/>} />}
           {user && <Route path="/track" element={<Track/>} />}
           <Route path="/productDetails/:id" element={<ProductDetails/>}/>
           {user && <Route path="/apriori" element={<Apriori/>}/>}
           {!user && <Route path="/login" element={<Login/>} />}
           {!user &&<Route path="/Signup" element={<Signup/>} />}
        </Routes>
    
    </BrowserRouter>}
    </ThemeProvider>
    
    </div>
  );
}

export default App;
