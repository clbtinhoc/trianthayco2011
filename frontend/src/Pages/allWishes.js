import React from 'react';
import { useParams } from 'react-router-dom';
class RenderWish extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            wishes: [],
            teacherName: props.name,
            ok: true,
        }
    }
    componentDidMount() {
        fetch(`http://localhost:5001/tri-an-2011/us-central1/api/getWishes/${this.state.teacherName}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ wishes: data });
            })
            .catch(err => this.setState({ ok: false }));
    }
    render() {
        console.log(this.state.quotes)
        // {
        //     "identity": {
        //         "name": "string" otherwise null,
        //         "class": "string" otherwise null,
        //         "year" : "string"
        //     },
        //     "content": {
        //         "wish": "string",
        //         "teacherName": "string"
        //     }
        // }
        let wishes = this.state.wishes.map((data, index) => {
            // let preview = JSON.stringify(data.content.wish).substring(0, 20)
            // let preview = JSON.stringify(data.wish) 
            let wish = {
                author: "Bạn " + JSON.stringify(data.identity.name),
                class: "Lớp " + JSON.stringify(data.identity.class),
                year: "Năm học là " + JSON.stringify(data.identity.year),
                preview: JSON.stringify(data.wish).substring(1, data.wish.length - 1).slice(0, 20) + "...",
            }
            console.log(data.identity.name === null)
            if (data.identity.name === null || data.identity.name === "") {
                wish.author = ""
            }
            if (data.identity.class === null || data.identity.class === "") {
                wish.class = ""
            }
            if (data.identity.year === null || data.identity.year === "") {
                wish.year = ""
            }
            let message = "một bạn"
            // Set message to <p>Một bạn ẩn danh</p> if every property in wish is null
            if (wish.author === "" && wish.class === "" && wish.year === "") {
                message += " ẩn danh"
            }
            else {
                message += `${wish.author} ${wish.class} ${wish.year}`
            }

            return (
                <div className="wish" key={index}>
                    <div className="wish-content">
                        <div className="preview">
                            {wish.preview}
                        </div>
                        <div className="from">
                            Lời chúc của {message}
                        </div>
                    </div>
                </div>
            )
        })

        if (this.state.ok) {
            return (
                <div>
                    <h4>Đang thể hiện lời chúc cho thầy/cô {this.state.teacherName}</h4>
                    <div className="wishes">
                        {wishes}
                    </div>
                </div>
            )
        }
        else {
            return (
                <p>Data is not found for this teacher</p>
            )
        }
    }
}
export default function AllWishes() {
    let params = useParams();
    return <RenderWish name={params.teacher} />
}