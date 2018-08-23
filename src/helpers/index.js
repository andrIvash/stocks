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
      .then(response => {
        return response.json();
      }).then( myJson => {
        if (myJson.status === 200 || myJson.status === 400) {
          return myJson
        }
        else {
          throw new Error('Network response was not ok.');
        }
      }).catch(function(error) {
        console.log(`There has been a problem with your fetch operation: ${error.message}`);
      });
  }
}