import React, { useState } from 'react'
import Select from 'react-select';

import './Stylesheets/find-wishes.css'

import LoadingPopup from './MiniComponents/LoadingPopup';
import WarningPopup from './MiniComponents/WarningPopup';

import teacherNameList from '../Assets/teacherNameListTitle.png'

export default class StartGetwish extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            options: [],
            value: null,
            loading: true,
            errorMsg: null,
        }
    }
    componentDidMount() {
        fetch("http://localhost:5001/tri-an-2011/asia-east2/api/getTeacherNames")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data,
                    loading: false,
                    options: data.map(item => {
                        return {
                            value: item,
                            label: item
                        }
                    })

                })
            })
            .catch(err => {
                this.setState = {loading: false, errorMsg: err.message}
            })

    }


    render() {
        let teacherOptions = this.state.options;
        console.log(teacherOptions)

        let TeacherList = function () {
            const [searchTerm, setSearchTerm] = useState("");
            let perTeacherList = teacherOptions.filter((val) => {
                if (searchTerm === ""){
                    return val;
                } else if (val.value.toLowerCase().includes(searchTerm.toLowerCase())){
                        return val;
                }
            }).map((option, key) => {
                return <div className="teacherName" key={key} onClick={() => {window.location = `/getWish/${option.value}`; console.log(option)}}>{option.value}</div>
            })
            return (
                <div>
                    <form className="searchbar" action="">
                        <input type="text" className="text" placeholder="Search Bar" name="search"
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }}
                        />
                        <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                    <div className="listgv">
                        {perTeacherList}
                    </div>
                    
                </div>

            );
        }

        return (
            <div style={{width:"70%", margin:"auto"}}>
                <LoadingPopup loading={this.state.loading} loadingMsg="Đang load danh sách thầy cô..."/>
                <WarningPopup warn={this.state.errorMsg} />
                <div class="main">
                        <img 
                        src={teacherNameList}
                        className="titleImage"
                        alt="Danh sách giáo viên"
                        />
                
                    <TeacherList />
                </div>
                {/* <Select
                    value={{ value: this.state.value, label: this.state.value }}
                    onChange={(selectedValue) => {
                        this.setState({
                            value: selectedValue.value
                        })
                        window.location = `/getWish/${selectedValue.value}`
                    }}
                    options={this.state.options}
                    placeholder="Select a teacher"
                /> */}
            </div>
        )
    }
}