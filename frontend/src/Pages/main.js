import React from 'react';
import "./Stylesheets/main.css"
import { Link } from 'react-router-dom';
export default class Main extends React.Component {
    // eslint-disable-next-line
    constructor() {
        super()
    }
    render() {
        return (
            <div className="main-page" style={{fontWeight: "bold"}}>

                <div className="slogan">
                    <h1 className="bruh2">chia sẻ</h1>
                    <h2 id="communism" style={{color: "black"}}>những lời chúc</h2>
                    <h2 className="bs">của chính mình đến</h2>
                    {/* <div className="something">
                       
                        <h2 id="to">to our</h2>

                    </div> */}

                    {/* <div className="something"> */}
                    <h2 style={{ fontSize: "6rem", margin: 0 }}
                        className="teacherthinglol">các thầy cô</h2>

                </div>
                <div className="buttons-to-redirect">
                    <div id="button-1">
                        <Link to="/start-getwish">
                            Tìm những lời chúc được chia sẻ
                        </Link>
                    </div>
                    <div id="button-2">
                        <Link to="/new-wish">
                            Tạo lời chúc mới
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}