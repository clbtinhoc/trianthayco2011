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
            <div className="main-page">
                <div className="slogan">
                    <h1 className="bruh2">Chia sẽ</h1>
                    <h2 id="communism">những lời yêu thương</h2>
                    <h2 className="bs">đến với các thầy cô giáo</h2>
                    {/* <div className="something">
                       
                        <h2 id="to">to our</h2>

                    </div> */}
                    <div className="teacherthing">
                        <h2 style={{ margin: 0, padding: 0 }}> nhân ngày </h2>

                    </div>
                    {/* <div className="something"> */}
                    <h2 style={{ fontSize: "6rem", margin: 0 }}
                        className="teacherthinglol">20/11</h2>

                </div>
                <div className="buttons-to-redirect">
                    <div id="button-1">
                        <Link to="/start-getwish">
                            Tìm những lời chúc đã được chia sẽ
                        </Link>
                    </div>
                    <div id="button-2">
                        <Link to="/new-wish">
                            Tạo lời chúc
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}