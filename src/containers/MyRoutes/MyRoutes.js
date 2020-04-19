import React from "react";
import { Loader } from "@util-components";
import { Header, RouteWrapper, MyRouteContainer, FormRenderContainer } from "./myroutes.style";
import InfoRoute from "./InfoRoute";
import { viadeManager } from "@utils";
import i18n from "i18n";

type Props = { webId: String };
const routePath = process.env.REACT_APP_VIADE_ES3C_ROUTES_PATH;

class MyRoute extends React.Component {
	constructor({ webId }: Props) {
		super();
		this.state = {
			data: null
		};
	}
	componentDidMount() {
		const { webId } = this.props;
		this._asyncRequest = viadeManager.readRoutesFromPod(webId).then((data) => {
			this._asyncRequest = null;
			this.setState({ data });
		});
	}
	componentWillUnmount() {}

	render(): React.ReactNode {
		const { webId } = this.props;
		let baseUrl = webId.split("/", 3) + "/";
		baseUrl = baseUrl.replace(",,", "//");
		if (this.state.data !== null && this.state.data !== "EMPTY") {
			return (
				<RouteWrapper data-testid="route-component">
					<MyRouteContainer data-testid="myroute-container">
						<FormRenderContainer>
							<Header data-testid="myroute-header">
								<h1>{i18n.t("myRoutes.title")}</h1>
							</Header>
							{this.state.data.map((ruta, index) => {
								return (
									<InfoRoute
										key={index}
										name={ruta.name}
										author={ruta.author}
										description={ruta.description}
										points={ruta.points}
										center={ruta.calculateCenter()}
										mult={ruta.multimedia}
										r={baseUrl + routePath + ruta.getIdRoute() + ".ttl"}
										uuid={ruta.getIdRoute()}
									/>
								);
							})}
						</FormRenderContainer>
					</MyRouteContainer>
				</RouteWrapper>
			);
		}
		if (this.state.data === "EMPTY") {
			return (
				<RouteWrapper data-testid="route-component">
					<MyRouteContainer data-testid="myroute-container">
						<FormRenderContainer>
							<Header data-testid="myroute-header">
								<h1>{i18n.t("myRoutes.title")}</h1>
							</Header>
							<h5 align="center">
								{i18n.t("myRoutes.noRoutes")}
								<a href={"#/route"}> {i18n.t("myRoutes.here")}</a>
							</h5>
						</FormRenderContainer>
					</MyRouteContainer>
				</RouteWrapper>
			);
		} else {
			return <Loader absolute />;
		}
	}
}

export default MyRoute;
