import React from 'react';

class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onSignInEmail = (event) => {
        this.setState({signInEmail: event.target.value});
    };

    onSignInPassword = (event) => {
        this.setState({signInPassword: event.target.value});
    };

    onSignInButtonSubmit = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange('home')
            }
        })
    };

    render() {
        return (
            <article className="br2 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                onChange={this.onSignInEmail}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                id="password"
                                onChange={this.onSignInPassword}
                            />
                        </div>
                        </fieldset>
                        <div className="">
                        <input onClick={() => this.onSignInButtonSubmit()} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2 ma2" type="submit" value="Sign in"/>
                        </div>
                        <div className="">
                        <input onClick={() => this.props.onRouteChange('register')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib br2" type="submit" value="Register"/>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignInForm;