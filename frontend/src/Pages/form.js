import React from "react"
import "./Stylesheets/form.css"
import formBg from "../Assets/form_background.png"

import Select from 'react-select';

export default class FormToReg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            identityName: null,
            identityClass: null,
            identityYear: null,
            teacher: null,
            anonName: false,
            anonClass: false,
            anonYear: false,
            wish: null,
            submit: false,
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
        if (!this.state.submit) {
            return (
                <div id="form">
                    <div>
                        {/* <img src={formBg} id="form-bg"></img> */}
                    </div>
                    {/* <div id="a-rectangle"></div> */}
                    <form onSubmit={this.handleSubmit}>

                        <div id="form-group-name">
                            <div className="checkBox-anon">
                                <input type="checkbox" id="anon-name" onChange={(e) => {
                                    this.setState({ anonName: !this.state.anonName });
                                    document.getElementById("nameInput").disabled = !this.state.anonName;
                                }}></input>
                                <label for="anon-name">Ẩn danh</label>
                            </div>
                            <input type="text" placeholder="Họ và tên" id="nameInput" onChange={(e) => {
                                this.setState({ identityName: e.target.value })
                            }}></input>
                        </div>
                        <div id="form-group-2">
                            <div id="form-group-class">
                                <div className="checkBox-anon">
                                    <input type="checkbox" id="anon-class" onChange={(e) => {
                                        this.setState({ anonClass: !this.state.anonClass });
                                        document.getElementById("classInput").disabled = !this.state.anonClass;
                                    }}></input>
                                    <label for="anon-class">Ẩn lớp</label>
                                </div>
                                <input type="text" placeholder="Lớp" id="classInput" onChange={(e) => {
                                    this.setState({ identityClass: e.target.value })
                                }}></input>
                            </div>
                            <div id="form-group-year">
                                <span className="checkBox-anon">
                                    <input type="checkbox" id="anon-year" onChange={(e) => {
                                        this.setState({ anonYear: !this.state.anonYear });
                                    }}></input>
                                    <label for="anon-year">Ẩn năm</label>
                                </span>
                                <Select value={this.state.identityYear} onChange={(selectedOption) => {
                                    this.setState({ identityYear: selectedOption });
                                }} options={this.years} isDisabled={this.state.anonYear} />
                            </div>

                        </div>
                        <div id="form-group-teacher">
                            <input type="text" placeholder="Gửi đến họ tên của thầy/cô" id="teacherInput" required onChange={(e) => {
                                this.setState({ teacher: e.target.value })
                            }}></input>
                        </div>
                        <div id="form-group-wish">
                            <textarea maxLength="250" placeholder="Điều bạn muốn gửi gắm đến thầy cô" required onChange={(e) => {
                                this.setState({ wish: e.target.value })
                            }}>

                            </textarea>
                        </div>
                        <button type="submit">Gửi đi</button>
                    </form>
                </div>
            )
        }
        else
        {
            return (
                <p>Thanks for submitting!</p>    
            )
        }
    }

}