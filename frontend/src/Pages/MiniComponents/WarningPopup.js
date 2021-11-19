import React from "react"
import Alert from 'react-bootstrap/Alert';

export default class WarningPopup extends React.Component {
    render(){
        if(!this.props.warn){
            console.log('nothing happen');
            return null;
        }

        console.log('something happen');

        return(
            <div className="warning-popup" style={{width:"50%", margin:"auto", textAlign:"center", position: "fixed", top: 0}}>
                <Alert variant="danger">
                    Lỗi: {this.props.warn}
                </Alert>
            </div>
        )
    }
}