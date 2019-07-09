import React, { Component } from 'react'
import { UserSession, AppConfig } from 'blockstack'

class Landing extends Component {

  userSession: UserSession; 
  constructor(props: any) {
    super(props)
    const appConfig = new AppConfig(['store_write', 'publish_data'])
    this.userSession = new UserSession({ appConfig })
  }

  signIn(e: { preventDefault: () => void; }) {
    e.preventDefault()
    this.userSession.redirectToSignIn("http://localhost:3000")
  }

  render() {
    return (
      <div>
          <button
            onClick={this.signIn.bind(this)}>Sign in with Blockstack
          </button>
      </div>
    );
  }
}

export default Landing