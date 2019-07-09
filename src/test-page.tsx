import * as test from "tape";
import * as log from 'loglevel';

import GaiaLevelDOWN from 'gaiadown-ts'
import React, { Component } from 'react'
import { UserSession, AppConfig } from 'blockstack'
const suite = require('abstract-leveldown/test')


interface Props {
    userSession: UserSession; 
}

class TestPage extends Component<Props, any> {
    userSession: UserSession; 

  constructor(props: Props) {
    super(props)
    this.userSession = this.props.userSession
  }

  fireTest(e: { preventDefault: () => void; }) {
    e.preventDefault()
    console.log('Your user session : ', this.props.userSession)
    console.log('starting the test!')
    var userSession = this.props.userSession;
    log.setDefaultLevel('DEBUG')
    let idx = 0; 
    var testCommon = suite.common({
        test: test,
        factory: function () {
          let session = userSession;
          let gaiaDb = new GaiaLevelDOWN("location"+idx++, session);
          return gaiaDb
        },
        snapshots: false,
        seek: false,
        bufferKeys: false,
        createIfMissing: false,
        errorIfExists: false
      })
      suite(testCommon)
  }

  render() {
    return (
      <div>
          <button
            onClick={this.fireTest.bind(this)}>Run the test
          </button>
      </div>
    );
  }
}

export default TestPage
