import React from "react"
import "./Stylesheets/form.css"

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
export default class FormToReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identityName: null,
            identityClass: null,
            identityYear: "Select your school year",
            teacher: "Select a teacher",
            anonName: false,
            anonClass: false,
            anonYear: false,
            wish: null,
            submit: false,
            existingTeachers: [],
            differentTeacher: false, // Actually true at first for the disabled thing lmao
            errorMsg: null,
            errorTimeout: null,
        }
        this.years = [{ value: "2016-2017", label: "2016-2017" },
        { value: "2017-2018", label: "2017-2018" },
        { value: "2018-2019", label: "2018-2019" },
        { value: "2019-2020", label: "2019-2020" },
        { value: "2020-2021", label: "2020-2021" },
        { value: "2021-2022", label: "2021-2022" },
        ]
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch("http://localhost:5001/tri-an-2011/us-central1/api/getTeacherNames")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    existingTeachers: data
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        clearInterval(this.state.errorTimeout)
        fetch("http://localhost:5001/tri-an-2011/us-central1/api/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identity: {
                    name: this.state.identityName,
                    class: this.state.identityClass,
                    year: this.state.identityYear
                },
                content: {
                    teacherName: this.state.teacher,
                    wish: this.state.wish
                }
            })
        }).then(res => res.json())
            .then(text => {
                console.log('success:', text)
                this.setState({ submit: true });
            })
            .catch(error =>{
                this.setState({errorMsg: error.message, errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
                console.log('error: ', error)
            })
    }
    render() {
        console.log(this.state.existingTeachers)
        console.log(this.state.teacher)
        let teacherOptions = this.state.existingTeachers.map(teacher => {
            return { value: teacher, label: teacher }
        })
        if (!this.state.submit) {
            return (
                <div id="form">
                    <WarningPopup warn={this.state.errorMsg} />
                    
                    <Form onSubmit={this.handleSubmit} className="form">
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" disabled={this.state.anonName}
                                onChange={
                                    (e) => { this.setState({ identityName: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicClass">
                            <Form.Label>Class</Form.Label>
                            <Form.Control type="text" placeholder="Enter class" onChange={
                                (e) => { this.setState({ identityClass: e.target.value }) }}
                                disabled={this.state.anonClass}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicYear">
                            <Form.Label>Year</Form.Label>
                            <Select
                                isDisabled={this.state.anonYear}
                                options={this.years}
                                onChange={(e) => { this.setState({ identityYear: e.value }) }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicTeacher">
                            <Form.Label>Teacher</Form.Label>
                            <Select
                                isDisabled={this.state.differentTeacher}
                                options={teacherOptions}
                                onChange={(e) => { this.setState({ teacher: e.value }) }}
                            />
                            <Form.Check type="checkbox"
                                label="Different teacher from list"
                                onChange={
                                    (e) => {
                                        this.setState({ differentTeacher: e.target.checked })
                                    }

                                }
                            ></Form.Check>
                            <Form.Control type="text" placeholder="Enter teacher name" onChange={
                                (e) => { this.setState({ teacher: e.target.value }) }}
                                disabled={!this.state.differentTeacher}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicWish">
                            <Form.Label>Wish</Form.Label>
                            <Form.Control as="textarea" rows="3"  required onChange={
                                (e) => { this.setState({ wish: e.target.value }) }}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicSubmit">
                            <Form.Check type="checkbox" label="Hide my name" onChange={
                                (e) => {
                                    this.setState({ anonName: e.target.checked })
                                    if (e.target.checked) {
                                        this.setState({ identityName: "" })
                                    }
                                }}
                                inline
                            />
                            <Form.Check type="checkbox" label="Hide my class" onChange={
                                (e) => {
                                    this.setState({ anonClass: e.target.checked })
                                    if (e.target.checked) {
                                        this.setState({ identityClass: "" })
                                    }

                                }}
                                inline
                            />
                            <Form.Check type="checkbox" label="Hide my school year" onChange={
                                (e) => {
                                    this.setState({ anonYear: e.target.checked })
                                    if (e.target.checked) {
                                        this.setState({ identityYear: "" })
                                    }
                                }}
                                inline
                            />

                        </Form.Group>
                        <div style={{width:"fit-content", margin:"auto"}}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </div>
                    </Form>
                    
                    
                </div>
            )
        }
        else {
            return (
                <div id="form">
                    <h1>Thanks for submitting</h1>
                </div>
            )
        }
    }
}

class WarningPopup extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        if(!this.props.warn){
            console.log('nothing happen');
            return null;
        }
        console.log('something happen');

        return(
            <div className="warning-popup" style={{width:"50%", margin:"auto", textAlign:"center"}}>
                <Alert variant="danger">
                    {this.props.warn}
                </Alert>
            </div>
        )
    }
}