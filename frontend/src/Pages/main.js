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
                    <h1 className="bruh2">sharing</h1>
                    <h2 id="communism">our own</h2>
                    <h2 className="bs">best wishes to our</h2>
                    {/* <div className="something">
                       
                        <h2 id="to">to our</h2>

                    </div> */}

                    {/* <div className="something"> */}
                    <h2 style={{ fontSize: "6rem", margin: 0 }}
                        className="teacherthinglol">teachers</h2>

                </div>
                <div className="buttons-to-redirect">
                    <div id="button-1">
                        <Link to="/start-getwish">
                            Find wishes that is shared
                        </Link>
                    </div>
                    <div id="button-2">
                        <Link to="/new-wish">
                            Share a new wish
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}