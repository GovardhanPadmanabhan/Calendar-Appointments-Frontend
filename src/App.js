import React, { Component } from 'react';
import AppRouter from './components/AppRouter';
import './App.css';
import axios from 'axios';

//to login...
//test123@example.com
//password

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      appointments: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/v1/appointments", {headers: JSON.parse(sessionStorage.getItem('user'))})
    .then(response => {
      console.log(response.data)
      this.setState({appointments: response.data})
    })
  }

  render () {
    return(
      <AppRouter appointments={this.state.appointments} />
    );
  }
}

export default App;
