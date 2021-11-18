import React from "react"
import "./Stylesheets/form.css"
import {ReactComponent as LoadingIcon} from '../Assets/Rolling-1s-200px.svg' //Loading icon

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
            identityYear: "",
            teacher: "",
            anonName: false,
            anonClass: false,
            anonYear: false,
            wish: null,
            submit: false,
            existingTeachers: [],
            differentTeacher: false, // Actually true at first for the disabled thing lmao
            loadedTeachers: false,
            sentSuccessful: false,
            loading: false,
            errorMsg: null,     
            errorTimeout: null,
            debug: true, //REMEMBER TO SET TO FALSE FOR PRODUCTION
        }
        this.years = [{ value: "2016-2017", label: "2016-2017" },
        { value: "2017-2018", label: "2017-2018" },
        { value: "2018-2019", label: "2018-2019" },
        { value: "2019-2020", label: "2019-2020" },
        { value: "2020-2021", label: "2020-2021" },
        { value: "2021-2022", label: "2021-2022" },
        ]
        this.handleSubmit = this.handleSubmit.bind(this);
        this.debugError = this.debugError.bind(this);
        this.debugLoadingScreen = this.debugLoadingScreen.bind(this);
        this.debugInfo = this.debugInfo.bind(this);
        this.resetInfo = this.resetInfo.bind(this);
    }

    componentDidMount() {
        fetch("https://asia-east2-tri-an-2011.cloudfunctions.net/api/getTeacherNames")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    existingTeachers: data,
                    loadedTeachers: true
                })
            })
            .catch(error => {
                this.setState({errorMsg: error.message, errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        clearInterval(this.state.errorTimeout)
        this.setState({loading: true})
        fetch("https://asia-east2-tri-an-2011.cloudfunctions.net/api/add", {
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
                this.setState({ submit: true, loading: false});
            })
            .catch(error =>{
                console.log('error: ', error)
                this.setState({loading:false, errorMsg: error.message, errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
            })
    }

    componentDidCatch(error, errorInfo) { //Handle general errors (WARNING: IT DOESNT HANDLE EVENT ERRORS)
        this.setState({errorMsg: error.message, errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
        console.log(errorInfo)
      }

    debugLoadingScreen(){
        console.log('debugLoadingScreen')
        this.setState({loading: true});
        setTimeout(() => this.setState({loading: false}), 3000)
    }

    debugError(){
        console.log('debugError')
        clearInterval(this.state.errorTimeout)
        this.setState({errorMsg: "test", errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
    }

    debugInfo(){
        console.log("debugInfo")
        this.setState(
            {
                identityName: 'Nguyễn Văn A',
                identityClass: '11A1',
                identityYear: "2017-2018",
                teacher: "Trần Thị B",
                anonName: false,
                anonClass: false,
                anonYear: false,
                wish: 'chúc mừng 20/11',
                differentTeacher: true,
            }
        )
    }

    resetInfo(){
        this.setState({
            identityName: null,
            identityClass: null,
            identityYear: "",
            teacher: "",
            anonName: false,
            anonClass: false,
            anonYear: false,
            wish: null,
            differentTeacher: false,
        })
    }

    render() {
        console.log(this.state.existingTeachers)
        console.log(this.state.teacher)
        let teacherOptions = this.state.existingTeachers.map(teacher => {
            return { value: teacher, label: teacher }
        })

        let loadingIconStyle = {
            width: "100%",
            height: "24px",
            display: this.state.loadedTeachers ? 'none' : 'inline'
        };
        
            if (!this.state.submit) {
                return (
                    <div id="form">
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
                                <Form.Label >Teacher</Form.Label>
                                <LoadingIcon style={loadingIconStyle}/>
                                <Select
                                    isDisabled={this.state.differentTeacher || !this.state.loadedTeachers} //disable teacher list until it has been loaded
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
                        <WarningPopup warn={this.state.errorMsg} />
                        <LoadingScreen loading={this.state.loading} /> 
                        
                        {/* Quick and dirty way of rendering the debug menu based on debug status */}
                        {/* {this.state.debug ? (
                            <div>
                                <p>DEBUG OPTIONS</p>
                                <button onClick={this.debugError} >Test Error</button>
                                <button onClick={this.debugLoadingScreen} >Test loading screen</button>
                                <button onClick={this.debugInfo}>Fill in demo info</button>
                                <button onClick={this.resetInfo}>reset info</button>
                            </div>
                        ): ("")} */}
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

class LoadingScreen extends React.Component {
    render(){
        let loadingScreenStyle = {
            // 'background-color': "rgba(0, 0, 0, 0.5)",
            // overflow: "auto"
        };

        let loadingIconStyle = {
            height: "48px",
            width: "100%",
            display: "flex",
            'justify-content': "center",
            'align-items': "center",
            //filter: "invert(97%) sepia(97%) saturate(0%) hue-rotate(24deg) brightness(103%) contrast(105%)" //white filter for the loading icon
        }

        let loadingTextStyle = {
            //color: 'white',
            display: 'inline',
            'text-align': 'center'
        }

        if(this.props.loading){
            return(
                <div style={loadingScreenStyle}>
                    <LoadingIcon style={loadingIconStyle}/>
                    <p style={loadingTextStyle}>Đang xử lý...</p>
                </div>
            )
        } else {
            return (null)
        }
    }
}

class WarningPopup extends React.Component {
    render(){
        if(!this.props.warn){
            console.log('nothing happen');
            return null;
        }

        console.log('something happen');

        return(
            <div className="warning-popup" style={{width:"50%", margin:"auto", textAlign:"center", position: "absolute", top: 0}}>
                <Alert variant="danger">
                    {this.props.warn}
                </Alert>
            </div>
        )
    }
}