import React from "react";
import { Loader } from "@util-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
			data: null,
			original: null
		};
		this.handleChange = this.handleChange.bind(this);
	}
	componentDidMount() {
		const { webId } = this.props;
		this._asyncRequest = viadeManager.readRoutesFromPod(webId).then((data) => {
			this._asyncRequest = null;
			this.setState({
				data: data,
				original: data
			});
		});
	}
	componentWillUnmount() {}

	handleChange(e) {
		var currentList = [];
		var newList = [];
		if (e.target.value !== "") {
			currentList = this.state.original;
			// eslint-disable-next-line
			newList = currentList.filter((item) => {
				if (item.name !== undefined) {
					const lc = item.name.toLowerCase();
					const filter = e.target.value.toLowerCase();
					return lc.includes(filter);
				}
			});
		} else {
			newList = this.state.original;
		}
		this.setState({
			data: newList
		});
	}

	async getTTL(element) {
		let file = await viadeManager.getTtl(element);
		return file;
	}

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
								<input
									type="text"
									className="input"
									onChange={this.handleChange}
									placeholder="Search..."
								/>
								<FontAwesomeIcon icon="search" className="search-icon" id="searchIcon" />
							</Header>
							{this.state.data.map((ruta, index) => {
								if (ruta.points.length > 0) {
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
											ttl={ruta.content}
											error={false}
											errorMore={false}
											webID={this.props}
											ruta={ruta}
										/>
									);
								} else {
									return (
										<InfoRoute
											key={index}
											error={i18n.t("myRoutes.errorParsing")}
											errorMore={i18n.t("myRoutes.errorParsingMore")}
										/>
									);
								}
							})}
						</FormRenderContainer>
					</MyRouteContainer>
				</RouteWrapper>
			);
		}
		if (this.state.data !== null) {
			if (this.state.data === "EMPTY" || this.state.data.length <= 0) {
				return (
					<RouteWrapper data-testid="route-component">
						<MyRouteContainer data-testid="myroute-container">
							<FormRenderContainer id="empty">
								<Header data-testid="myroute-header">
									<h1 id="h1-empty">{i18n.t("myRoutes.title")}</h1>{" "}
								</Header>
								<h5 align="center">
									{i18n.t("myRoutes.noRoutes")}
									<a href={"#/route"}> {i18n.t("myRoutes.here")}</a>
								</h5>
							</FormRenderContainer>
						</MyRouteContainer>
					</RouteWrapper>
				);
			}
		} else {
			return <Loader absolute />;
		}
	}
}

export default MyRoute;
