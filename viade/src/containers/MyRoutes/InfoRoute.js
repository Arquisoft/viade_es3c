import React, { Component } from 'react';

export class InfoRouteComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      autor: ''
    };
  }
 render() {
    const { name, autor } = this.state;
    return (
      <MyRoute {...{ name, autor}} />
    );
  }
}