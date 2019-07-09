import React, { Component } from 'react'
import './App.css'
import { UserSession } from 'blockstack'

import Landing from './landing'
import TestPage from './test-page'



class App extends Component {

  userSession: UserSession; 
  constructor(props: Readonly<{}>) {
    super(props)
    this.userSession = new UserSession()
  }

  componentWillMount() {
    const session = this.userSession
    if(!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn()
      .then((userData) => {
        if(!userData.username) {
          throw new Error('This app requires a username.')
        }
        // window.location = `/kingdom/${userData.username}`
      })
    }
  }

  render() {
    return (
      <main role="main">
          {this.userSession.isUserSignedIn() ?
            <TestPage userSession={this.userSession}/>
          :
            <Landing/>
          }
      </main>
    );
  }
}

export default App