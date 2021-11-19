import React from 'react';
import "./Stylesheets/allWishes.css"
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import teacherNameFrame from '../Assets/teacherNameFrame.png'

import LoadingPopup from './MiniComponents/LoadingPopup';
import WarningPopup from './MiniComponents/WarningPopup';

class RenderWish extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            wishes: [],
            teacherName: props.name,
            loading: false,
            errorMsg: null,
            ok: true,
        }
    }
    componentDidMount() {
        clearInterval(this.state.errorTimeout)
        this.setState({loading: true})
        fetch(`http://localhost:5001/tri-an-2011/asia-east2/api/getWishes/${this.state.teacherName}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ wishes: data, ok: true, loading: false});
            })
            .catch(err => {
                this.setState({ errorMsg: err.message, errorTimeout: setTimeout(() => this.setState({errorMsg: null}), 3000)})
                this.setState({ ok: false, loading: false, errorMsg: err.message });
            });
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
                author: data.identity.name,
                class: "lớp " + data.identity.class,
                year: "năm học " + data.identity.year,
                preview: data.wish + "...",
            }
            if (data.identity.name === null || data.identity.name === "") {
                wish.author = "một bạn ẩn danh"
            }
            if (data.identity.class === null || data.identity.class === "") {
                wish.class = ""
            }
            if (data.identity.year === null || data.identity.year === "") {
                wish.year = ""
            }
            let message;
            // Set message to <p>Một bạn ẩn danh</p> if every property in wish is null
            if (wish.author === "" && wish.class === "" && wish.year === "") {
                message = "một bạn ẩn danh"
            }
            else {
                message = `${wish.author} ${wish.class} ${wish.year}`
            }

            // return (
            //     <div className="wish" key={index} onClick={
            //         ()=>{
            //             window.location=`/getwish/${this.state.teacherName}/${index}`
            //         }
            //     }>
            //         <div className="wish-content">
            //             <div className="preview">
            //                 "{wish.preview}"
            //             </div>
            //             <br />
                        
            //             <div className="from">
            //                 From {message}
            //             </div>
            //         </div>
            //     </div>
            // )
            return(
                <Card style={{width:'18rem', marginLeft: "2%"}}>
                    <Card.Body>
                        <Card.Title>{wish.preview}</Card.Title>
                        <Card.Text>
                            Từ {message}
                        </Card.Text>
                        <Button variant="primary" onClick={
                            ()=>{
                                window.location=`/getwish/${this.state.teacherName}/${index}`
                            }
                        }>
                            View
                        </Button>

                    </Card.Body>
                </Card>
            )
        })

        if (this.state.ok) {
            return (
                <div style={{width:"70%", margin:"auto"}}>
                    <div className="teacherNameContainer">
                        <img src={teacherNameFrame} />
                        <div class="teacherNameText">{this.state.teacherName}</div>
                    </div>
                    <div className="wishes">
                        {wishes}
                    </div>
                    <WarningPopup warn={this.state.errorMsg} />
                    <LoadingPopup loading={this.state.loading} loadingMsg="Đang tải các lời chúc..."/> 
                </div>
            )
        }
        else {
            return (
                <div>
                    <p style={{margin: "auto",}}>KHÔNG TÌM ĐƯỢC CÁC LỜI CHÚC</p>
                    <p>Lỗi: {this.state.errorMsg}</p>
                </div>

            )
        }
    }
}
export default function AllWishes() {
    let params = useParams();
    return (
        <div>
            <Button onClick={() => {window.location = '/start-getwish'}} style={{"margin-left": "10vw"}}>Quay Lại</Button>
            <RenderWish name={params.teacher} />
        </div>
       
    )
}