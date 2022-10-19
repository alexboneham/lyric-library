export const isResponseOk = (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    console.log('Response status was not within range');
    response.json().then((data) => {
      console.log(data);
      throw Error(response.statusText);
    });
  }
};
