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
        fetch("https://asia-east2-tri-an-2011.cloudfunctions.net/api/getTeacherNames")
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
                <h3 style={{color: "black", textAlign: "center"}}>Chọn tên một thầy cô để xem lời chúc</h3>
                <Select
                    value={{ value: this.state.value, label: this.state.value }}
                    onChange={(selectedValue) => {
                        this.setState({
                            value: selectedValue.value
                        })
                        window.location = `/getwish/${selectedValue.value}`
                    }}
                    options={this.state.options}
                    placeholder="Select a teacher"
                />
            </div>
        )
    }
}