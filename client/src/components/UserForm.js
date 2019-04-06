import React from 'react';
import axios from 'axios';

import { withRouter } from 'react-router-dom';

class UserForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
          });
    }

    register = e => {
        const user = { ...this.state };

        axios.post('http://localhost:3300/api/register', user)
             .then(res => {
                 console.log(res);
             })
             .catch(err => {
                 console.log(err);
             });
    }

    login = e => {
        const user = { ...this.state };

        axios.post('http://localhost:3300/api/login', user)
             .then(res => {
                 console.log(res);
                 localStorage.setItem('JWT', res.data.token);
                 this.props.history.push('/jokes');
             })
             .catch(err => {
                 console.log(err);
             });
    }

    render() {
        return (
            <div className='container'>
                <h1>Welcome</h1>

                <label>Username</label>
                <input type='text'
                       name='username'
                       placeholder='username'
                       value={ this.state.username }
                       onChange={ this.handleChange }
                       />

                <label>Password</label>
                <input type='text'
                       name='password'
                       placeholder='password'
                       value={ this.state.password }
                       onChange={ this.handleChange }
                       />

                <button onClick={this.login}
                        className='btn waves-effect waves-light'
                        type='submit'
                        name='action'>
                        Login
                        <i className="material-icons right">send</i>    
                </button>
                
                <button onClick={this.register}
                        className='btn waves-effect waves-light'>
                        Register
                </button>
            </div>
        )
    }
}

export default withRouter(UserForm);