import React from 'react'
import Select from 'react-select';
export default class StartGetwish extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            options: [],
            value: null,
        }
    }
    componentDidMount() {
        fetch("http://localhost:5001/tri-an-2011/asia-east2/apigetTeacherNames")
            .then(res => res.json())
            .then(data => {
                this.setState({
                    data: data,
                    options: data.map(item => {
                        return {
                            value: item,
                            label: item
                        }
                    })

                })
            })

    }
    render() {
        return (
            <div style={{width:"70%", margin:"auto"}}>
                <h3 style={{color: "white", textAlign: "center"}}>Choose a name to view their wishes</h3>
                <Select
                    value={{ value: this.state.value, label: this.state.value }}
                    onChange={(selectedValue) => {
                        this.setState({
                            value: selectedValue.value
                        })
                        window.location = `/getWish/${selectedValue.value}`
                    }}
                    options={this.state.options}
                    placeholder="Select a teacher"
                />
            </div>
        )
    }
}