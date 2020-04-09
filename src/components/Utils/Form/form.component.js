import React from 'react';

import {
    DivForms,
    LabelInput,
    TitleRoute,
    DivMin
} from './form.component.style'

class RouteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async uploadFiles() {
      const filesInput = document.getElementById('files');
      const files = filesInput.files;
      const fc = new FC(auth);

      for (let i = 0; i < files.length; i++) {
        try {
          const fileName = files[i].name;
          const url = "https://sonialavandera.solid.community/public/routes" + fileName;
          console.log(url);
          await fc.createFile(url);
        } catch (e) {
          console.log(e);
        }
      }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    createRoute() {

    }

    render() {
        return (
            <DivMin>
                <TitleRoute> New Route </TitleRoute>
                <form onSubmit={this.createRoute}>
                    <DivForms>
                        <LabelInput>
                            Name of the route:
                             <input type="text" name="route_name" onChange={this.handleChange} />
                        </LabelInput>
                    </DivForms>

                    <DivForms>
                        <LabelInput>
                            Description of the route:
                           <input type="text" name="desc_name" onChange={this.handleChange} />
                        </LabelInput>
                    </DivForms>

                    <div>
                        <label> Upload images </label>
                        <input type="file" name="images" onChange={this.handleChange} multiple />
                    </div>
                    <div id="buttonSubmit">
                      <input type="submit" value="Submit" />
                    </div>
                </form>
            </DivMin>
        );
    }

}
export default RouteForm;
