import React, {Component} from 'react';
import {Link, Router} from 'react-router-dom';
import axios from 'axios';
import '../styles/prediction.css'

export default class CreatePrediction extends Component{
    constructor(props){
        super(props);
        this.state = {
            age:'',
            bmi:'',
            children:'',
            sex:'',
            smoker:'',
            region:'',
            charge:''
        }
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeBmi = this.onChangeBmi.bind(this);
        this.onChangeSex = this.onChangeSex.bind(this);
        this.onChangeSmoker = this.onChangeSmoker.bind(this);
        this.onChangeRegion = this.onChangeRegion.bind(this);
        this.onChangeChildren = this.onChangeChildren.bind(this);
        this.onChangeCharges = this.onChangeCharge.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            age:'',
            bmi:'',
            children:'',
            sex:'',
            smoker:'',
            region:'',
            charge:''
        }
    }
    componentDidMount(){

    }
    onChangeAge(e){
        this.setState({
            age:e.target.value
        })
    }
    onChangeBmi(e){
        this.setState({
            bmi:e.target.value
        })
    }
    onChangeChildren(e){
        this.setState({
            children:e.target.value
        })
    }
    onChangeSex(e){
        this.setState({
            sex:e.target.value
        })
    }
    onChangeSmoker(e){
        this.setState({
            smoker:e.target.value
        })
    }
    onChangeRegion(e){
        this.setState({
            region:e.target.value
        })
    }
    onChangeCharge(e){
        this.setState({
            charges:e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();
        const prediction = {
          age: this.state.age,
          bmi: this.state.bmi,
          children: this.state.children,
          sex: this.state.sex,
          smoker: this.state.smoker,
          region: this.state.region
        };
    
        console.log(prediction);
        axios.post('http://127.0.0.1:5000/new_pred', prediction)//TODO POST
        .then(res => {
          const pred = JSON.parse(res.data.result);
          this.setState({charge: pred})
        });
    }
    render() {
        return (
            <div className="container">
              <div className="row">
                <div className="col">
                  
                </div>
                <div className="col">
                  <Link to="/listmedicalcosts" >List Predictions</Link>
                </div>
              </div>
              <div className="row">
              <div className="col">
                  <form onSubmit={this.onSubmit}>
                  <label>
                    <p>Age</p>
                    <input type="number"
                        required
                        name="age"
                        maxLength="2"
                        className="form-control"
                        value={this.state.age}
                        onChange={this.onChangeAge}
                        />
                  </label>
                  <label>
                    <p>Sex</p>
                      <div onChange={this.onChangeSex}>
                        <input type="radio" value="male" name="gender" /> Male
                        <input type="radio" value="female" name="gender" /> Female
                      </div>
                  </label>
                  <label>
                    <p>BMI</p>
                    <input type="number"
                        required
                        name="bmi"
                        className="form-control"
                        value={this.state.bmi}
                        onChange={this.onChangeBmi}
                        />
                  </label>
                  <label>
                    <p>Children</p>
                    <input type="number"
                        required
                        name="children"
                        className="form-control"
                        value={this.state.children}
                        onChange={this.onChangeChildren}
                        />
                  </label>
                  <label>
                    <p>Smoker</p>
                    <div onChange={this.onChangeSmoker}>
                      <input type="radio" value="yes" name="smoker" /> Yes
                      <input type="radio" value="no" name="smoker" /> No
                    </div>
                  </label>
                  <label>
                    <p>Region</p>
                      <select onChange={this.onChangeRegion}>
                        <option defaultValue="northwest">Northwest</option>
                        <option value="southeast">Northeast</option>
                        <option value="southeast">Southeast</option>
                        <option value="southwest">Southwest</option>
                      </select>
                  </label>
                  <div>
                    <button type="submit">Predict</button>
                  </div>
                </form>
                </div>
                <div className="col">
                <label>
                    <p>Prediction Results: </p>
                    <input type="text"
                        disabled
                        name="charge"
                        className="form-control"
                        value={this.state.charge}
                        onChange={this.onChangeCharge.bind(this)}
                        />
                  </label>
                </div>
              </div>
            </div>
        )
      }
}
