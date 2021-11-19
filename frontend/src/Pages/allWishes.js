import React from 'react';
import "./Stylesheets/allWishes.css"
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
        fetch(`http://localhost:5001/tri-an-2011/asia-east2/api/getWishes/${this.state.teacherName}`)
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
                author: data.identity.name,
                class: "lớp " + data.identity.class,
                year: "vào trường vào năm " + data.identity.year,
                preview: data.wish + "...",
            }
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
                message = " anonymous"
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
                            From {message}
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
                    <h3 style={{textAlign:"center", color:"white"}}>Display wishes for {this.state.teacherName}</h3>
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