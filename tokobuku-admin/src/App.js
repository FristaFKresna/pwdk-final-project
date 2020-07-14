import React from 'react';
import { Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register'
import TokoBukuNavbar from './components/Navbar';
import VerificationSuccess from './pages/VerificationSuccess';
import ProductList from './pages/ProductList';
import DashBoard from './pages/Dashboard';
import AllProduct from './pages/AllProduct';
import PostProduct from './pages/InputProduct';
import Transaction from './pages/Transaction';
import Payment from './pages/TransactionDetail';

class App extends React.Component{
	render(){
		return(
			
			<div>
				<TokoBukuNavbar/>

				<Route exact path='/'>
					<Login/>
				</Route>

				<Route path='/register'>
					<Register/>
				</Route>

				<Route path='/dashboard'>
					<DashBoard/>
				</Route>

				<Route path='/product'>
					<AllProduct/>
				</Route>

				<Route path='/post'>
					<PostProduct/>
				</Route>

				<Route path='/transaction'>
					<Transaction/>
				</Route>

				<Route path='/payment'>
					<Payment/>
				</Route>
				
			</div>
	)
	}
}

export default App