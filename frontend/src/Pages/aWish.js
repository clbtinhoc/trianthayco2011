import React from "react";
import { useParams } from "react-router-dom";
class Renderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wish: null,
            // loading: true
        }
    }
    componentDidMount() {
        fetch(`http://localhost:5001/tri-an-2011/us-central1/api/getWishes/${this.props.params.teacher}/${this.props.params.index}`)
            .then(res => res.json())
            .then(data => {

                this.setState({
                    wish: data,
                })

            })
    }
    render() {
        let data = this.state.wish
        let Rendered;
        if (data != null) {
            let preview = JSON.stringify(data.wish)
            let wish = {
                author: "Bạn " + JSON.stringify(data.identity.name),
                class: "Lớp " + JSON.stringify(data.identity.class),
                year: "Năm học " + JSON.stringify(data.identity.year),
                preview: JSON.stringify(data.wish),
            }
            console.log(data.identity.name == null)
            if (data.identity.name == null || data.identity.name == "") {
                wish.author = ""
            }
            if (data.identity.class == null || data.identity.class == "") {
                wish.class = ""
            }
            if (data.identity.year == null || data.identity.year == "") {
                wish.year = ""
            }
            let message;
            // Set message to <p>Một bạn ẩn danh</p> if every property in wish is null
            if (wish.author == "" && wish.class == "" && wish.year == "") {
                message = "Bạn ẩn danh"
            }
            else {
                message = `${wish.author} ${wish.class} ${wish.year}`
            }
            Rendered = function () {
                return (
                    <div className="wish-container">
                        <div className="wish-header">
                            <p>Lời chúc này đến từ {message}</p>
                        </div>
                        <div className="wish-body">
                            <p>{preview}</p>
                        </div>
                    </div>
                )
            }
        }
        else {
            Rendered = function () {
                return (<p>Lời chúc này hiện không có</p>)
            }
        }
        return (
            <Rendered />
        )
    }
}


export default function GetAWish() {
    let params = useParams();
    console.log(params);
    return <Renderer params={params} />
}