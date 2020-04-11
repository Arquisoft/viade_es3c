import React, { Component } from "react";
import { MultimediaPageContent } from "./multimedia.component";

type Props = { webId: String };
export class MultimediaComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      isLoading: false
    };
  }

  render() {
    const { name, image, isLoading } = this.state;
    const { webId } = this.props;
    return <MultimediaPageContent {...{ name, image, isLoading, webId }} />;
  }
}
