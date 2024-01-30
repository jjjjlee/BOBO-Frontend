import { AsyncStorage } from 'react-native';

let parseJson = json => JSON.parse(json);

export function GetUserToken() {
    return AsyncStorage
      .getItem('user')
      .then(parseJson);
  }

  export function SaveUserToken(token) {
    return new Promise((resolve) => {
      let user = {token};
      let userString = JSON.stringify(user);
  
      AsyncStorage.setItem('user', userString);
      resolve(user);
    });
  }
  
  export function RemoveUserToken() {
    return AsyncStorage.removeItem('user');
  }