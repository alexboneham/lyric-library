export const isResponseOk = (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    console.log(`from helper func: ${response.statusText}`)
    throw Error(response.statusText);
  }
};
