import React, { Component } from 'react';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer';
// import '../styles/app.css';

class App extends Component {

  onSelect = () => {
    console.log('click');
  }

  onSendFile = (ev) => {
    ev.preventDefault();
    console.log('send file', this.refs);
    const formData = new FormData()
    
    formData.append('file', this.refs._file.files[0])
    fetch(ev.target.action,
      {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
         // "Content-Type": "multipart/form-data",
        },
        body: formData
      }).then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then((myJson) => {
      console.log(JSON.stringify(myJson));
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    
  }

  render() {
    return (
      <div className="wrapper">
        <div className="page__header">
          <Header handleSelect = {this.onSelect} />
        </div>

        <main className="page__content">
          <h2 className="heading heading--1">
          Home page.
          </h2> 

          <ul className="list">
            <li className="list__item">
              <a className="link" href="/blog">
                Blog
              </a>
            </li>
          </ul>
          <form action="http://localhost:3005/api/v1.0/upload"
            method="post"
            onSubmit = {this.onSendFile}
            encType="multipart/form-data">
            <input type="file" ref="_file" />
            <button type="submit">send</button>
          </form>
          <button type="button">Clear all</button>
        </main>

        <Footer className="page__footer" />
      </div>  
    );
  };
}

export default App;