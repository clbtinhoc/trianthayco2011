import React from "react";
import { useParams } from "react-router-dom";
import "./Stylesheets/aWish.css"
import { BsLink45Deg } from "react-icons/bs";
import Button from 'react-bootstrap/Button';

import letter from '../Assets/Group 1.png'

import LoadingPopup from './MiniComponents/LoadingPopup';
import WarningPopup from './MiniComponents/WarningPopup';

class Renderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ok: true,
            wish: null,
            loading: true,
            errorMsg: null,
        }
    }
    componentDidMount() {
        this.setState({loading: true});
        fetch(`http://localhost:5001/tri-an-2011/asia-east2/api/getWishes/${this.props.params.teacher}/${this.props.params.index}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ });
                this.setState({
                    ok: true,
                    wish: data,
                    loading: false
                })

            })
            .catch(err => {
                this.setState({ errorMsg: err.message})
                this.setState({ ok: false, loading: false, errorMsg: err.message });
            });
    }
    render() {
        let data = this.state.wish
        let Rendered;
        let teacherName = this.props.params.teacher
        let index = this.props.params.index
        if (data != null && this.state.ok) {
        
            let wish = {
                author: "" + JSON.stringify(data.identity.name),
                class: "lớp " + JSON.stringify(data.identity.class),
                year: "năm học " + JSON.stringify(data.identity.year),
                preview: JSON.stringify(data.wish).substring(1, data.wish.length - 1),
            }
            console.log(data.wish)
            // console.log(data.identity.name === null)
            if (data.identity.name === null || data.identity.name === "") {
                wish.author = ""
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
            
            // Rendered = function () {
            //     return (
            //         <div>
            //             <div className="wish-container">
            //                 <div className="wish-header">
            //                     <p>This wish is from {message} </p>
            //                 </div>
            //                 <div className="wish-body">
            //                     <p>{preview}</p>
            //                 </div>
            //             </div>
            //             <div className="controls">
            //                 Share to your friends or your teacher!
            //                 <div className="copyLink" onClick={()=>{
            //                       var copyText = document.getElementById("link");

            //                       /* Select the text field */
            //                       copyText.select();
            //                       copyText.setSelectionRange(0, 99999); /* For mobile devices */

            //                        /* Copy the text inside the text field */
            //                       navigator.clipboard.writeText(copyText.value);
            //                       alert("Copied!")
            //                 }}>
            //                     <BsLink45Deg /> Copy link
            //                 </div>
            //                 <input hidden id="link" value={`http://localhost:3000/getWish/${teacherName}/${index}`} />
            //             </div>
            //         </div>
            //     )
            // }

            Rendered = function () {
                return (
                    <div>
                        {/* <Card style={{ width: "fit-content", margin: "auto" }} >
                            <Card.Body>
                                <Card.Title style={{whiteSpace: "pre-line"}}>
                                    {data.wish}
                                </Card.Title>
                                <Card.Text>
                                    Từ {message}
                                </Card.Text>
                            </Card.Body>
                        </Card> */}

                        <div className="imgContainer">
                                <div className="mainText">{data.wish}</div>
                                <div className="miniText">Từ {message}</div>
                                <img src={letter} className="mainImg" alt="Nền bức thư"/>
                        </div>
                        <div className="controls">
                            Chia sẻ lời chúc này cho người thân
                            <div className="copyLink" onClick={() => {
                                var copyText = document.getElementById("link");
                                // Copy text in copyText
                                copyText.select();
                                copyText.setSelectionRange(0, 99999); /* For mobile devices */
                                navigator.clipboard.writeText(copyText.value);
                                alert("Sao chép thành công!")
                            }}>
                                <BsLink45Deg /> Sao chép đường link

                            </div>
                            <input hidden id="link" value={`https://localhost:3000/getwish/${teacherName}/${index}`} />
                        </div>
                    </div>
                )
            }
        }
        else {
            Rendered = function () {
                return (
                    <div>
                        <p>Lời chúc này không tồn tại</p>
                    </div>

                )
            }
        }
        return (
            <div id="Rendered">
                
                <WarningPopup warn={this.state.errorMsg}/>
                <LoadingPopup loading={this.state.loading} loadingMsg="Đang tải lời chúc..."/>
                <Rendered style={{visibility: this.state.loading ? "hidden" : "visible"}} />
            </div>

        )
    }
}


export default function GetAWish() {
    let params = useParams();
    console.log(params);
    return (
    <div>
        <Button onClick={() => {window.location = "./"}} style={{"margin-left": "10vw"}}> Quay Lại </Button>
        <Renderer params={params} />
    </div>
    )
}