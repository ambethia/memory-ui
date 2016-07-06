import React, { Component } from 'react';

export default class Card extends Component {

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    this.props.clickHandler(this.props.index);
  }

  render() {
    let turned = this.props.value === null ? 'turned' : '';
    return (
      <div className={`card ${turned}`} onClick={this.handleClick}>
        <div className="face">{this.props.value}</div>
        <div className="back"></div>
      </div>
    );
  }
}
