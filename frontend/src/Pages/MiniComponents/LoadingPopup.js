import React from "react"
import {ReactComponent as LoadingIcon} from '../../Assets/Rolling-1s-200px.svg' //Loading icon

//this component takes in 2 props, loading and loading message
//loading is a bool, if true it renders the loading popup, if not it renders nothing
//loadingMsg is a loading message (duh), to accompany the loading icon
export default class LoadingPopup extends React.Component {
    constructor(props){
        super(props)
        this.state = {loadingMsg: this.props.loadingMsg}
    }
    render(){
        let loadingScreenStyle = {
            padding: "7px",
            'background-color': "rgb(255, 255, 255)",
            border: "1px solid gray",
            "border-radius": "5px",
            position: "absolute", 
            top: 0,
            width: "60%",
            "max-height": "8vh"
        };

        let loadingIconStyle = {
            height: "48px",
            width: "100%",
            display: "flex",
            'justify-content': "center",
            'align-items': "center",
            //filter: "invert(97%) sepia(97%) saturate(0%) hue-rotate(24deg) brightness(103%) contrast(105%)" //white filter for the loading icon
        }

        let loadingTextStyle = {
            //color: 'white',
            'text-align': 'center'
        }

        if(this.props.loading){
            return(
                <div style={loadingScreenStyle}>
                    <LoadingIcon style={loadingIconStyle}/>
                    <p style={loadingTextStyle}>{this.state.loadingMsg}</p>
                </div>
            )
        } else {
            return (null)
        }
    }
}