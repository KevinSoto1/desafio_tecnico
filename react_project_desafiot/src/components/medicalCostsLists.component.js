import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

export default class medicalCostsLists extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      predictions: []
    };
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:5000/datalog')
     .then(response => {
      this.setState({ predictions: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }

  render() {
    return (
        <div className="container">
            <h1>List Predictions</h1>
            <p></p>
            <Link to="/" >Return</Link>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Creation Time and date</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Bmi</th>
                <th>Children</th>
                <th>Smoker</th>
                <th>Region</th>
                <th>Charge</th>
                </tr>
            </thead>
            <tbody>
              {this.state.predictions.map((currentprediction, index) =>{
                const {age, sex, bmi, children, smoker, region, charge, creation_time} = currentprediction
                return(
                  <tr key={currentprediction.id}>
                    <td>{creation_time}</td>
                    <td>{age}</td>
                    <td>{sex}</td>
                    <td>{bmi}</td>
                    <td>{children}</td>
                    <td>{smoker}</td>
                    <td>{region}</td>
                    <td>{charge}</td>
                  </tr>
                )
              })}
            </tbody>
            </Table>
        </div>
    )
  }
}