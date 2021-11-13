import React from "react"
import "./Stylesheets/form.css"

import Select from 'react-select';

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
            differentTeacher: true, // Actually true at first for the disabled thing lmao
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
        fetch("http://localhost:5001/tri-an-2011/us-central1/api//getTeacherNames")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    existingTeachers: data
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submit: true });
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
                console.log(text)
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
                    <div>
                        {/* <img src={formBg} id="form-bg"></img> */}
                    </div>
                    {/* <div id="a-rectangle"></div> */}
                    <form onSubmit={this.handleSubmit}>

                        <div id="form-group-name">

                            <input type="text" placeholder="Full name" id="nameInput" value={this.state.identityName} required onChange={(e) => {
                                this.setState({ identityName: e.target.value })
                            }}></input>
                        </div>
                        <div id="form-group-2">

                            <div id="form-group-class">

                                <input type="text" placeholder="Class" id="classInput" value={this.state.identityClass} required onChange={(e) => {
                                    this.setState({ identityClass: e.target.value })
                                }}></input>
                            </div>
                            <div id="form-group-year">

                                <div className="select-year selectorlmao">
                                    <div>
                                        <Select value={{ value: this.state.identityYear, label: this.state.identityYear }} onChange={(selectedOption) => {
                                            this.setState({ identityYear: selectedOption.value });
                                        }} options={this.years} isDisabled={this.state.anonYear} placeholder="School year" />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div id="form-group-teacher">
                            <div className="checkBox-anon">
                            <span>Teacher is not on the list</span>
                            
                                    <input type="checkbox" id="anon-teacher" onChange={(e) => {
                                        this.setState({ differentTeacher: !this.state.differentTeacher });
                                        document.getElementById("teacherInput").disabled = !this.state.differentTeacher;
                                    }}></input>
                            
                            </div>
                            <div className="selectorlmao">
                                <Select value={{ value: this.state.teacher, label: this.state.teacher }} options={teacherOptions} onChange={
                                    (selectedOption) => {
                                        this.setState({ teacher: selectedOption.value })
                                    }
                                }
                                    placeholder="Teacher's name"
                                    isDisabled={!this.state.differentTeacher}
                                ></Select>
                            </div>


                        </div>
                        <input autoComplete="off" disabled type="text" placeholder="Teacher full name" id="teacherInput" required onChange={(e) => {
                            this.setState({ teacher: e.target.value })
                        }}></input>
                        <div id="form-group-wish">
                            <textarea maxLength="250" placeholder="Write what you want to send to teacher..." required onChange={(e) => {
                                this.setState({ wish: e.target.value })
                            }}>

                            </textarea>
                        </div>

                        <div className="anon-check">
                            <p>Do you want to</p>

                            <div>
                                <input type="checkbox" onChange={(e) => {
                                
                                    this.setState({ anonName: !this.state.anonName });
                                    document.getElementById("nameInput").disabled = !this.state.anonName;
                                }} />
                                <p>Hide name</p>
                            </div>
                            <div>
                                <input type="checkbox" onChange={(e) => {

                                    if (!this.state.anonName) {
                                        this.setState({ anonName: !this.state.anonName }); // Name
                                        document.getElementById("nameInput").disabled = !this.state.anonName;
                                    }
                                    this.setState({ anonYear: !this.state.anonYear });
                                    this.setState({ anonClass: !this.state.anonClass });
                                    if (!this.state.anonName) {
                                        this.setState({
                                            identityName: "",
                                            identityYear: "",
                                            identityClass: ""
                                        })
                                    }
                                    else {
                                        this.setState({ identityYear: "Select your school year" })
                                    }
                                    document.getElementById("classInput").disabled = !this.state.anonClass;


                                }} />
                                <p>Hide all</p>
                            </div>

                        </div>
                        <button type="submit">Send</button>
                    </form>
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