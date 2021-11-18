import React from "react"
import "./Stylesheets/form.css"

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import LoadingPopup from "./MiniComponents/LoadingPopup";
import WarningPopup from "./MiniComponents/WarningPopup";

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
        fetch("http://localhost:5001/tri-an-2011/asia-east2/api/getTeacherNames")
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
        fetch("http://localhost:5001/tri-an-2011/asia-east2/api/add", {
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
            if (!this.state.submit) {
                return (
                    <div id="form">
                        <Form onSubmit={this.handleSubmit} className="form" >
                            <Form.Group controlId="formBasicName" class="formInputName">
                            <Form.Check  type="checkbox" style={{"margin-right" : "7px"}} onChange={
                                    (e) => {
                                        this.setState({ anonName: !e.target.checked })
                                        if (e.target.checked) {
                                            this.setState({ identityName: "" })
                                        }
                                    }}
                                    inline 
                                    defaultChecked
                                />
                                <Form.Label class="formLabel">Họ và tên</Form.Label>
                                
                                <Form.Control type="text" placeholder="Nhập tên" disabled={this.state.anonName}
                                    onChange={
                                        (e) => { this.setState({ identityName: e.target.value }) }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicClass" class="formInputClass">
                                <Form.Check  type="checkbox" style={{"margin-right" : "7px"}} onChange={
                                    (e) => {
                                        this.setState({ anonClass: !e.target.checked })
                                        if (e.target.checked) {
                                            this.setState({ identityClass: "" })
                                        }
    
                                    }}
                                    inline
                                    defaultChecked
                                />
                                <Form.Label class="formLabel">Lớp</Form.Label>
                                
                                <Form.Control type="text" placeholder="Nhập lớp" onChange={
                                    (e) => { this.setState({ identityClass: e.target.value }) }}
                                    disabled={this.state.anonClass}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicYear" class="formInputYear">
                                <Form.Check type="checkbox" style={{"margin-right" : "7px"}} onChange={
                                    (e) => {
                                        this.setState({ anonYear: !e.target.checked })
                                        if (e.target.checked) {
                                            this.setState({ identityYear: "" })
                                        }
                                    }}
                                    inline
                                    defaultChecked
                                />
                                <Form.Label class="formLabel">Năm học</Form.Label>

                                <Select
                                    isDisabled={this.state.anonYear}
                                    options={this.years}
                                    onChange={(e) => { this.setState({ identityYear: e.value }) }}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicTeacher" class="formInputName">
                                <Form.Label >Gửi đến thầy/cô</Form.Label>
                                <LoadingPopup loading={!this.state.loadedTeachers} loadingMsg="Load danh sách thầy cô..."/>
                                <Select
                                    isDisabled={this.state.differentTeacher || !this.state.loadedTeachers} //disable teacher list until it has been loaded
                                    options={teacherOptions}
                                    onChange={(e) => { this.setState({ teacher: e.value }) }}
                                />
                                
                                <Form.Check type="checkbox"
                                    label="Thêm tên thầy cô"
                                    onChange={
                                        (e) => {
                                            this.setState({ differentTeacher: e.target.checked })
                                        }
    
                                    }
                                ></Form.Check>
                                <Form.Control type="text" placeholder="Điền họ/tên (nếu không có)" onChange={
                                    (e) => { this.setState({ teacher: e.target.value }) }}
                                    disabled={!this.state.differentTeacher}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicWish" class="formInputName">
                                <Form.Label>Điều bạn muốn gửi gấm đến thầy/cô (dưới 250 từ)</Form.Label>
                                <Form.Control as="textarea" rows="3"  required onChange={
                                    (e) => { this.setState({ wish: e.target.value }) }}
                                />
                            </Form.Group>
                            <div style={{width:"fit-content", margin:"auto"}}>
                                <Button variant="primary" type="submit">
                                    Gửi
                                </Button>
                            </div>
                        </Form>
                        <WarningPopup warn={this.state.errorMsg} />
                        <LoadingPopup loading={this.state.loading} loadingMsg="Đang xử lý dữ liệu..."/> 
                        
                        {/* Quick and dirty way of rendering the debug menu based on debug status */}
                        {this.state.debug ? (
                            <div>
                                <p>DEBUG OPTIONS</p>
                                <button onClick={this.debugError} >Test Error</button>
                                <button onClick={this.debugLoadingScreen} >Test loading screen</button>
                                <button onClick={this.debugInfo}>Fill in demo info</button>
                                <button onClick={this.resetInfo}>reset info</button>
                                <button onClick={() => this.setState({submit: true})}>After submit page</button>
                            </div>
                        ): ("")}
                    </div>
                )
            }
            else {
                return (
                    <div id="form">
                        <h1>Thanks for submitting</h1>
                        <Button onClick={() => this.setState({submit: false})}>Quay lại</Button>
                    </div>
                )
            }
        
    }
}
