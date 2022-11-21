import {Nav, Container, Row, Col, Table} from 'react-bootstrap'
import React, {useContext, useState, useEffect, Fragment} from 'react'
import {Navigate, Link} from 'react-router-dom'
import UserContext from '../UserContext'
import MonthlyIncome from '../components/MonthlyIncome'

function ViewIncome() {
	const {user} = useContext(UserContext)

	const [incomes, setIncomes] = useState([])
	const [total, setTotal] = useState([])
	const [year, setYear] = useState('')

	const viewIncome = (e) => {
		e.preventDefault()
		fetch(`https://powerful-meadow-76469.herokuapp.com/income/${year}`, {
			method : 'GET',
			headers : {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			setIncomes(data)
			viewAnnual()
		})
	}

	const viewAnnual = () => {
		fetch(`https://powerful-meadow-76469.herokuapp.com/AnnualIncome/${year}`, {
			method : 'GET',
			headers : {
				Authorization : `Bearer ${localStorage.getItem('token')}`
			}
		})
		.then(res => res.json())
		.then(data => setTotal(data))
	}

	return (
		(user.id === null) ?
			<Navigate to="/login" />
		:
		<Container fluid className="vw-100 m-0 p-0">
			<p className="text-center header">Finance Tracker</p>
		    <Row className="vw-100">
				<Col md="2">
					<Nav className="flex-column">
						<Nav.Link as={Link} to="/">Home</Nav.Link>
						<Nav.Link as={Link} to="/addIncome">Add Income</Nav.Link>
						<Nav.Link className="page" as={Link} to="/viewIncome">View Monthly Income</Nav.Link>
						<Nav.Link as={Link} to="/viewAnnual">View Annual Salary</Nav.Link>
						<Nav.Link as={Link} to="/addExpense">Add Expense</Nav.Link>
						<Nav.Link as={Link} to="/viewExpense">View Expenses</Nav.Link>
						<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
					</Nav>
					<p></p>
				</Col>
				<Col md="10">
					<p></p>
					<form onClick={e => viewIncome(e)} >
						<label>Year: </label>
			    		<select onChange={e => setYear(e.target.value)}>
			    			<option value="none">----</option>
				    		<option value="2022">2022</option>
				    		<option value="2023">2023</option>
				    		<option value="2024">2024</option>
				    		<option value="2025">2025</option>
				    		<option value="2026">2026</option>
				    		<option value="2027">2027</option>
				    		<option value="2028">2028</option>
				    		<option value="2029">2029</option>
				    		<option value="2030">2030</option>
				    	</select>
				    </form>
			    	<p></p>
	    	    	<div className="App">
	    	    	    <Table>
	    	    	    	<thead>
	    		    	       	<tr>
	    		    	        	<th>Date</th>
	    		    	        	<th>Gross Income</th>
	    		    	        	<th>Basic Salary</th>
	    		    	        	<th>Non-Taxables</th>
	    		    	        	<th>SSS Contribution</th>
	    		    	        	<th>Philhealth Contribution</th>
	    		    	        	<th>Pagibig Contribution</th>
	    		    	        	<th>Tax Withheld</th>
	    		    	        	<th>Net Income</th>
	    		    	       	</tr>
	    		    	    </thead>

		    	    	    <tbody className="view">
	    		    	       	{incomes.map(income => {
	    		    	        	return (
	    		    	           	<tr>
	    	    	            		<td>{income.month}-{income.day}-{income.year}</td>
	    	    	            		<td>{income.grossIncome}</td>
	    	    	            		<td>{income.basicSalary}</td>
	    	    	            		<td>{income.nonTaxables}</td>
	    	    	            		<td>{income.SSS}</td>
	    	    	            		<td>{income.philhealth}</td>
	    	    	            		<td>{income.pagibig}</td>
	    	    	            		<td>{income.TWH}</td>
	    	    	            		<td>{income.netIncome}</td>
	    		    	           	</tr>
	    		    	        	)
	    		    	       	})}
		    	    	    </tbody>

	    		    	    <tfoot>
	       		    	       	{total.map(income => {
	       		    	        	return (
	       		    	           	<tr>
	       	    	            		<td>Total</td>
	       	    	            		<td>{income.grossIncome}</td>
	       	    	            		<td>{income.basicSalary}</td>
	       	    	            		<td>{income.nonTaxables}</td>
	       	    	            		<td>{income.SSS}</td>
	       	    	            		<td>{income.philhealth}</td>
	       	    	            		<td>{income.pagibig}</td>
	       	    	            		<td>{income.TWH}</td>
	       	    	            		<td>{income.netIncome}</td>
	       		    	           	</tr>
	       		    	        	)
	       		    	       	})}
				    	    </tfoot>
			    	    </Table>
			    	</div>
			    </Col>
			</Row>
		</Container>
	)
}

export default ViewIncome


