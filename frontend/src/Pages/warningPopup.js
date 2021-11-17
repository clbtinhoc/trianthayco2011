import React from "react"
import "./Stylesheets/warningPopup.css"

//This component take in 2 props. warning message (warn) and warning type (warnError)
//While warning message is a string, warning type take in a bool, if true it will render the 
//error Red (depicting huge error), if false it will render the error Yellow (just a warn)

//WARNING: This is only an error rendering component, it takes in the error msg and it is 
//your job to discard the error after a set amount of time (i prefer 3 seconds)

export default class WarningPopup extends React.Component {
    render(){
        let WarningBoxStyle = "WarningBox";

        if(!this.props.warn){
            console.log('nothing happen');
            return null;
        }

        console.log('something happen');

        if(this.props.warnError){
            WarningBoxStyle += " WarningRed"
        } else {
            WarningBoxStyle += " WarningYellow"
        }

        return(
            <div className={WarningBoxStyle}>
                <h1 className="WarningText">
                    {this.props.warnError ? "Lỗi" : "Nhắc"} : '{this.props.warn}'
                </h1>
            </div>
        )
    }
}