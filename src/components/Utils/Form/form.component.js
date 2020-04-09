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
                             <input type="text" id="route_name" name="route_name" onChange={this.handleChange} />
                        </LabelInput>
                    </DivForms>

                    <DivForms>
                        <LabelInput>
                            Description of the route:
                           <input type="text" id="description_name" name="desc_name" onChange={this.handleChange} />
                        </LabelInput>
                    </DivForms>

                    <div>
                        <label> Upload images </label>
                        <input type="file" id="id_img" name="images" onChange={this.handleChange} multiple />
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
