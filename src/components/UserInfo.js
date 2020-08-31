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

  setUserInfo = (firstInput, secondInput) => {
    this._profileName.textContent = firstInput.value;
    this._profileJob.textContent = secondInput.value;
  }
}
