import React from 'react';
import axios from 'axios';
import requireAuth from '../auth/requireAuth';

import { withRouter } from 'react-router-dom';

class Jokes extends React.Component {
    constructor(props) {
        super(props);

        this.state = { jokes: [] }
    }

    logout = e => {
        localStorage.removeItem('JWT');
        this.props.history.push('/welcome');
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
            <div className='container'>
                <h1>Dad Jokes</h1>

                <button onClick={this.logout}
                        className="btn-floating btn-large waves-effect waves-light red"
                        id='logout'>
                        LogOut
                </button>

                <ul>
                   { this.state.jokes.map(joke => <li key={joke.id}
                                                      className='z-depth-1 section'>
                                                        { joke.joke }
                                                    </li>)} 
                </ul>
            </div>
        )
    }
}

export default requireAuth(withRouter(Jokes));