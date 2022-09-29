export const isResponseOk = (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    console.log(response.json().error)
    throw Error(response.statusText);
  }
};
