import React, { Component } from 'react';
import './styles/App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import Upload from './Components/Upload';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

// const apiKey = '?api_key=daea6550-3366-4ad6-a4b1-38cd719383a5';
const baseUrl = "http://localhost:8080/videos/";


class App extends Component {

  state = {
    videos: ''
  }

  componentDidMount = () => {
  let request = fetch(baseUrl)
  request.then((response) => {
      return response.json();
  }).then((videoData) => {
    this.setState({videos: videoData});
  }).catch((err) => {
      console.error("Caught error: ", err);
  });
  }

  render() {
    if(this.state.videos){
      return (
          <Router>
            <div className="App">
              <Header />
              <Switch>
                <Route path='/main/:id' exact render={ (props) => { return <Main {...props} videos={ this.state.videos } /> } } /> 
                <Route path='/upload' exact component={Upload} />
                <Route path={'/'} render = { () => <Redirect to='/main/1edc16bd-1bad-418b-bd40-c72ddd926672'/>} />
              </Switch>
            </div>
          </Router>
      );
    }
      return <div>L O A D I N G ...</div>
  }
}

export default App;
