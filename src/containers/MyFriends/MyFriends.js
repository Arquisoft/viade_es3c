import React from 'react';
import {
    Header,
    RouteWrapper,
    MyRouteContainer,
    FormRenderContainer,
    Friends,
    FormAddFriends
} from './myfriends.style';
import { List } from '@solid/react';
import InfoFriends from "./InfoFriends";
import friendsHelper from "./FriendsHelper";
import { successToaster } from "@utils";

type Props = { webId: String };

class MyFriends extends React.Component {
    constructor({ webId }: Props) {
        super();
        this.webID = webId;
        this.state = {
            friendWebID: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ friendWebID: event.target.value });
    }

    getList() {
        return <Friends>
            <List src={"user.friends"}>{
                (item, i) =>
                    <InfoFriends
                        key={i}
                        name={getUserName(`${item}`)}
                        url={<a href={getUrl(`${item}`)}>{getUrl(`${item}`)}</a>}
                        webidUser={this.webID}
                        webidFriend={`${item}`}
                    />
            }
            </List>
        </Friends>;
    }




    handleClick(e) {
        e.preventDefault();
        friendsHelper.addFriend(this.webID, this.state.friendWebID);
        successToaster("Amigo añadido correctamente", "Éxito");
        refreshPage();

    }


    addFriends() {
        return (
            <FormAddFriends>
                <form>
                    <label>
                        WebId:
                    <input type="text" name="webID" onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Add" onClick={(e) => this.handleClick(e)} />
                </form>
            </FormAddFriends>
        );
    }

    render(): React.ReactNode {
        return (
            <RouteWrapper data-testid="route-component">
                <MyRouteContainer>

                    <FormRenderContainer>
                        <Header>
                            <h1>Adding new Friends</h1>
                        </Header>
                        {this.addFriends()}
                        <Header>
                            <h1>My friends</h1>
                        </Header>
                        {this.getList()}
                    </FormRenderContainer>
                </MyRouteContainer>
            </RouteWrapper>
        );
    }


};

export const getUserName = (name) => {
    let author = name.replace("https://", "");
    author = author.replace(".solid.community/profile/card#me", "");
    author = author.replace(".inrupt.net/profile/card#me", "");
    return author;
}


export const getUrl = (name) => {
    return name.replace("profile/card#me", "");
};

export const refreshPage = () => {
    window.location.reload();
}

export const removeFriend = (webIdUser, friendWebID) => {
    friendsHelper.deleteFriend(webIdUser, friendWebID);
    successToaster("Amigo eliminado correctamente", "Éxito");
    //refreshPage();
}



export default MyFriends;
