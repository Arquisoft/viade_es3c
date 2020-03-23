import React from 'react';

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

    render() {
        return (
            <div>
                <h3>Routes</h3>
                <form>
                    <div>
                        <label>
                            Name of the route:
            <input type="text" name="route_name" onChange={this.handleChange} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description of the route:
            <input type="text" name="desc_name" onChange={this.handleChange} />
                        </label>
                    </div>

                    <div>
                        <label> Upload images </label>
                        <input type="file" name="images" onChange={this.handleChange} multiple />
                    </div>
                    <div id="buttonSubmit">
                    <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }

}
export default RouteForm;

