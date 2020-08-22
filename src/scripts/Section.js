import { Card } from './Card.js';

export default class Section {
  constructor ({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  renderItems ()  {
    this._initialArray.forEach((item) => {
      this._renderer(item);
    })
  }

  addItem (element) {
    this._container.append(element)
  }
}