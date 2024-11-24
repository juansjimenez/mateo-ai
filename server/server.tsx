//import Config from 'react-native-config'
const serverIP = '';

const get = async (url: string) => {
  try {
    const response = await fetch(`${serverIP}${url}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

const post = async (url: string, body: Record<string, unknown>) => {
  try {
    const response = await fetch(`${serverIP}${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export default {
  post,
  get,
};
