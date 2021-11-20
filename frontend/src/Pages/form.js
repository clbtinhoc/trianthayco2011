import React from "react"
import "./Stylesheets/form.css"

import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { BsLink45Deg } from "react-icons/bs";
import LoadingPopup from "./MiniComponents/LoadingPopup";
import WarningPopup from "./MiniComponents/WarningPopup";

import trangtri2 from "../Assets/trangtri2.png"

const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'yellow' : 'black',
      backgroundColor: state.isSelected ? 'green' : state.isFocused ? '#FFDCAD' : 'white',
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isSelected ? '1px solid black' : '0px',
      height: '20px',
      padding: '0px',
      marginTop: "0px",
    }),
    
  }

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
            debug: false, //REMEMBER TO SET TO FALSE FOR PRODUCTION lol k
            indexNumber: 0,
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
        clearInterval(this.state.errorTimeout);
        this.setState({loading: true})
        if(this.state.identityYear === "" && !this.state.anonYear){
            this.setState({loading: false, errorMsg:"Vui lòng nhập năm học", errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
            return 0;
        }
        if(this.state.teacher === ""){
            this.setState({loading: false, errorMsg:"Vui lòng nhập tên thầy cô", errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
            return 0;
        }
        if(this.state.wish === ""){
            this.setState({loading: false, errorMsg:"Vui lòng nhập mong muốn", errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
            return 0;
        }
        if(this.state.wish.split(" ").length > 100){
            this.setState({loading: false, errorMsg:"Mong muốn quá dài, vui lòng thử lại", errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
            return 0;
        }

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
                this.setState({ submit: true, loading: false, index: text.index});
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
                    <div id="container">
                        <div id="formContainer">
                            <div className="decor">
                                <img
                                    src={trangtri2}
                                    width='200px'
                                    alt="decor"
                                    className="decorImage"
                                />
                                <h1 id="TriAnText">TRI ÂN <br/>THẦY CÔ</h1>

                            </div>
                            <Form onSubmit={this.handleSubmit} className="formMain" >
                                <Form.Group controlId="formBasicName" className="formInputName formGroup">
                                <Form.Check  type="checkbox" className ="formCheckbox" onChange={
                                        (e) => {
                                            this.setState({ anonName: !e.target.checked })
                                            if (e.target.checked) {
                                                this.setState({ identityName: "" })
                                            }
                                        }}
                                        inline 
                                        defaultChecked
                                    />
                                    <Form.Label className="formLabel">Họ và tên</Form.Label>
                                    
                                    <Form.Control type="text" placeholder="" disabled={this.state.anonName}
                                        onChange={
                                            (e) => { this.setState({ identityName: e.target.value }) }}
                                        required={!this.state.anonName}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicClass" className="formInputClass formGroup">
                                    <Form.Check  type="checkbox" className ="formCheckbox" onChange={
                                        (e) => {
                                            this.setState({ anonClass: !e.target.checked })
                                            if (e.target.checked) {
                                                this.setState({ identityClass: "" })
                                            }
        
                                        }}
                                        inline
                                        defaultChecked
                                    />
                                    <Form.Label className="formLabel">Lớp</Form.Label>
                                    
                                    <Form.Control type="text" placeholder="" onChange={
                                        (e) => { this.setState({ identityClass: e.target.value }) }}
                                        disabled={this.state.anonClass}
                                        required={!this.state.anonClass}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicYear" className="formInputYear formGroup">
                                    <Form.Check type="checkbox" className ="formCheckbox" onChange={
                                        (e) => {
                                            this.setState({ anonYear: !e.target.checked })
                                            if (e.target.checked) {
                                                this.setState({ identityYear: "" })
                                            }
                                        }}
                                        inline
                                        defaultChecked
                                    />
                                    <Form.Label className="formLabel">Năm học</Form.Label>

                                    <Select
                                        styles={customStyles}
                                        // className="react-select-container"
                                        isDisabled={this.state.anonYear}
                                        defaultValue={{label: "", value: ""}}
                                        options={this.years}
                                        onChange={(e) => { this.setState({ identityYear: e.value }) }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicTeacher" className="formInputName formGroup">
                                    <Form.Label >Gửi đến thầy/cô</Form.Label>
                                    <LoadingPopup loading={!this.state.loadedTeachers} loadingMsg="Load danh sách thầy cô..."/>
                                    <Select
                                        styles={customStyles}
                                        isDisabled={this.state.differentTeacher || !this.state.loadedTeachers} //disable teacher list until it has been loaded
                                        options={teacherOptions}
                                        defaultValue={{label: "", value: ""}}
                                        onChange={(e) => { this.setState({ teacher: e.value }) }}
                                    />
                                    <Form.Group className="formGroup" style={{margin: '10px 0px'}}>
                                        <Form.Check type="checkbox"
                                            onChange={
                                                (e) => {
                                                    this.setState({ differentTeacher: e.target.checked })
                                                }
            
                                            }
                                            inline
                                        ></Form.Check>
                                        <Form.Label>Thêm tên thầy cô</Form.Label>
                                        <Form.Control type="text" placeholder="" onChange={
                                            (e) => { this.setState({ teacher: e.target.value }) }}
                                            disabled={!this.state.differentTeacher}
                                        />
                                    </Form.Group>
                                    
                                </Form.Group>
                                <Form.Group controlId="formBasicWish" className="formInputName formGroup">
                                    <Form.Label>Điều bạn muốn gửi gấm đến thầy/cô (dưới 300 kí tự)</Form.Label>
                                    <Form.Control as="textarea" rows="3"  maxlength="300" required onChange={
                                        (e) => { this.setState({ wish: e.target.value }) }}
                                    />
                                </Form.Group>
                                <div style={{width:"fit-content", margin:"auto", alignItems:"center"}}>
                                    <Button variant="primary" type="submit">
                                        Gửi
                                    </Button>
                                </div>
                            </Form>
                            <WarningPopup warn={this.state.errorMsg} />
                            <LoadingPopup loading={this.state.loading} loadingMsg="Đang xử lý dữ liệu..."/> 
                        </div> 
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
                    <div id="formContainer" style={{backgroundColor: "white"}}>
                        <h1>Cám ơn bạn đã tham gia!</h1>
                        <div className="controls">
                            Chia sẻ cho thầy cô và bạn bè của bạn!
                            <div className="copyLink" onClick={() => {
                                var copyText = document.getElementById("link");
                                // Copy text in copyText
                                copyText.select();
                                copyText.setSelectionRange(0, 99999); /* For mobile devices */
                                navigator.clipboard.writeText(copyText.value);
                                alert("Copied!")
                            }}>
                                <BsLink45Deg /> Copy link

                            </div>
                            <input hidden id="link" value={`https://tri-an-2011.web.app/getwish/${this.state.teacher}/${this.state.index}`} />
                        </div>
                        <Button onClick={() => window.location.reload()} style={{marginBottom: "1%"}}>Gửi thêm một lời chúc nữa</Button>
                        <Button onClick={() => window.location = `/start-getwish`}>Xem các lời chúc</Button>
                    </div>

                )
            }
        
    }
}
