import React from 'react';
import { getHeaders } from '../../utils';
import Suggestion from './Suggestion';

class Suggestions extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        console.log('All Suggestions component created');
        this.state={
            suggestions:[]
        }
        this.getSuggestionsFromserver();
    }
    getSuggestionsFromserver(){
        fetch("https://photo-app-secured.herokuapp.com/api/suggestions/", {
            method: "GET",
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                suggestions:data
            })
        });
    }
    componentDidMount() {
        // fetch posts
        console.log('All Suggestions component mounted');
    }

    render () {
        return (
            this.state.suggestions.length===0?
                (<div>Loading...</div>):
            <div>
                {
                    this.state.suggestions.map(suggestion=>{
                        return (<Suggestion model={suggestion} key={'post-' + suggestion.id}></Suggestion>)
                    })
                }
            </div>
        );
    }
}

export default Suggestions;