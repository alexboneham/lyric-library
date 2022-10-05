export const isResponseOk = (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    console.log('Fetch response did not pass')
    throw Error(response.statusText);
  }
};
