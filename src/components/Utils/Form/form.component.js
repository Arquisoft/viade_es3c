import React from 'react';
import auth from "solid-auth-client"
import FC from "solid-file-client"

class RouteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }




    async uploadFiles(){
        const filesInput = document.getElementById('files');
        const files = filesInput.files;


        const fc   = new FC( auth );
      //  const {webId} = this.props;

        for(let i=0; i<files.length; i++){
            try {
                const fileName=files[i].name;
                //const url=webId.split("profile/card#me")[0]+"public/"+fileName;
                const url = "https://sonialavandera.solid.community/public/routes" + fileName;
                console.log(url);
                await fc.createFile(url);
            }catch (e) {
                console.log(e);

            }

        }
    }

    render() {
        return (
            <div>
                <h3>Routes</h3>
                <form>
                    <div>
                        <label>
                            Name of the route:
            <input type="text" name="route_name" />
                        </label>
                    </div>

                    <div>
                        <label>
                            Description of the route:
            <input type="text" name="desc_name" />
                        </label>
                    </div>

                    <div>
                        <label> Upload files </label>
                        <input type="file" id="files" name="files" onClick={()=>this.uploadFiles()} multiple />
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

