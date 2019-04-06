import React from 'react';
import axios from 'axios';

import requireAuth from '../auth/requireAuth';

class Jokes extends React.Component {
    constructor(props) {
        super(props);

        this.state = { jokes: [] }
    }

    componentDidMount() {
        axios.get('http://localhost:3300/api/jokes/')
            .then(res => {
              this.setState({ jokes: res.data })
            })
            .catch(err => {
              console.log(err);
            })
      }
    
    render() {
        return(
            <div>
                <h1>Dad Jokes</h1>
                <ul>
                   { this.state.jokes.map(joke => <li key={joke.id}>{ joke.joke }</li>)} 
                </ul>
            </div>
        )
    }
}

export default requireAuth(Jokes);