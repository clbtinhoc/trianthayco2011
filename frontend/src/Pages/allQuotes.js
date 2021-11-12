import React from 'react';

export default class AllQuotes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quotes: [],
        }

    }
    componentDidMount(){
        
    }
    render(){
        console.log(this.state.quotes)
    }
}