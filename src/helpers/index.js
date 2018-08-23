export default {
  API: {
    UPLOAD: 'http://localhost:3005/api/v1.0/upload',
  },
  sendData: (url, data) => {
    return fetch(url,
      {
        method: 'POST',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: data
      })
      .then(function(response) {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      }).then((myJson) => {
        return JSON.stringify(myJson);
      }).catch(function(error) {
        console.log(`There has been a problem with your fetch operation: ${error.message}`);
      });
  }
}