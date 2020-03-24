import React from 'react';
import auth from "solid-auth-client"
import FC from "solid-file-client"

import {
    TextArea,
    DivForms,
    InputSubmit,
    LabelInput,
    InputFile,
    TitleRoute,
    DivMin
} from './form.component.style'

class RouteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    async uploadFiles() {
        const filesInput = document.getElementById('files');
        const files = filesInput.files;


        const fc = new FC(auth);
        //  const {webId} = this.props;

        for (let i = 0; i < files.length; i++) {
            try {
                const fileName = files[i].name;
                //const url=webId.split("profile/card#me")[0]+"public/"+fileName;
                const url = "https://sonialavandera.solid.community/public/routes" + fileName;
                console.log(url);
                await fc.createFile(url);
            } catch (e) {
                console.log(e);

            }

        }
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
            <input type="text" name="route_name" placeholder="New Route" />
                        </LabelInput>
                    </DivForms>

                    <DivForms>
                        <LabelInput>
                            Description of the route:
            <TextArea type="text" name="description" placeholder="Description for the new Route" rows="10" />
                        </LabelInput>
                    </DivForms>

                    <DivForms>
                        <LabelInput> Upload files </LabelInput>
                        <InputFile type="file" id="files" name="files" multiple />
                    </DivForms>
                    <DivForms id="buttonSubmit">
                        <InputSubmit type="submit" value="Save" />
                    </DivForms>
                </form>
            </DivMin>
        );
    }

}
export default RouteForm;