import { nameInput, jobInput } from './Utils.js';

export default class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserInfo() {
    const userInfo = {};

    userInfo.name = this._profileName.textContent;
    userInfo.info = this._profileJob.textContent;

    return userInfo;
  }

  setUserInfo = () => {
    this._profileName.textContent = nameInput.value;
    this._profileJob.textContent = jobInput.value;
  }
}
