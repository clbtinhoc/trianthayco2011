import React from "react";
import { useParams } from "react-router-dom";
import "./Stylesheets/aWish.css"
import { BsLink45Deg } from "react-icons/bs";
import Card from "react-bootstrap/Card";
class Renderer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wish: null,
            // loading: true
        }
    }
    componentDidMount() {
        fetch(`https://asia-east2-tri-an-2011.cloudfunctions.net/api/getWishes/${this.props.params.teacher}/${this.props.params.index}`)
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
        let teacherName = this.props.params.teacher
        let index = this.props.params.index
        if (data != null) {
            let preview = JSON.stringify(data.wish)
            let wish = {
                author: "" + JSON.stringify(data.identity.name),
                class: "class " + JSON.stringify(data.identity.class),
                year: "joined school in year " + JSON.stringify(data.identity.year),
                preview: JSON.stringify(data.wish).substring(1, data.wish.length - 1),
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
            let message;
            // Set message to <p>Một bạn ẩn danh</p> if every property in wish is null
            if (wish.author === "" && wish.class === "" && wish.year === "") {
                message = "Anonymous"
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
                        <Card style={{ width: "fit-content", margin: "auto" }} >
                            <Card.Body>

                                <Card.Title>{wish.preview}</Card.Title>
                                <Card.Text>
                                    This wish is from {message}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <div className="controls">
                            Share to your friends or your teacher!
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
                            <input hidden id="link" value={`https://tri-an-2011.web.app/getwish/${teacherName}/${index}`} />
                        </div>
                    </div>
                )
            }
        }
        else {
            Rendered = function () {
                return (<p>This wish doesn't exist</p>)
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