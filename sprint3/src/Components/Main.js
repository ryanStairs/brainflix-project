import React, { Component } from 'react';
import Section from './Section';
import Aside from './Aside';

class Main extends Component {
    render(){
      return(
        <main>
          <Section match={this.props.match} videos={this.props.videos}/>
          <Aside match={this.props.match} videos={this.props.videos}/>
        </main>
      )
    }
  }

  export default Main;