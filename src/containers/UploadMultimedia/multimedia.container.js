import React, { Component } from 'react';
import data from '@solid/query-ldflex';
import { namedNode } from '@rdfjs/data-model';
import { MultimediaPageContent } from './multimedia.component';
import { successToaster, errorToaster } from '@utils';

const defaultProfilePhoto = 'img/icon/upload_multimedia.svg';

type Props = { webId: String }; 
export class MultimediaComponent extends Component<Props> {
  constructor(props) {
    super(props);
    const w = this.props.webId
    console.log(this.props.webId);
    this.state = {
      name: '',
      isLoading: false,
      hasImage: false
    };
    
  }
  
  

  componentDidMount() {
    const { webId } = this.props;
    if (webId) this.getProfileData();
  }

  componentDidUpdate(prevProps) {
    const { webId } = this.props;
    if (webId && webId !== prevProps.webId) this.getProfileData();
  }

  getProfileData = async () => {
    this.setState({ isLoading: true });
    let hasImage;
    const { webId } = this.props;
  
    const user = data[webId];
    const nameLd = await user.vcard_fn;

    const name = nameLd && nameLd.value.trim().length > 0 ? nameLd.value : webId.toString();
    const imageLd = await user.vcard_hasPhoto;

    let image;
    if (imageLd && imageLd.value) {
      image = imageLd.value;
      hasImage = true;
    } else {
      hasImage = false;
      image = defaultProfilePhoto;
    }

    this.setState({ name, image, isLoading: false, hasImage });
  };


  updatePhoto = async (uri: String, message, title = '') => {
    const { hasImage } = this.state;
    try {
      const { user } = data;
      if (hasImage) await user.vcard_hasPhoto.set(namedNode(uri));
      else await user.vcard_hasPhoto.add(namedNode(uri));
      successToaster(message, title);
    } catch (error) {
      errorToaster(error.message, 'Error');
    }
  };

  render() {
    const { name, image, isLoading } = this.state;
    const { webId } = this.props;
    console.log(webId)
    return (
      <MultimediaPageContent {...{ name, image, isLoading, webId, updatePhoto: this.updatePhoto }} />
    );
  }
}
