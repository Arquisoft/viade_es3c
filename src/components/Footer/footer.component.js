import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import React from "react";
import { withTranslation } from "react-i18next";

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary">
			{"Copyright © "}
			<Link color="inherit" href="https://github.com/Arquisoft/viade_es3c">
				ViadeEs3c{" "}
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: "10px",
		textAlign: "center",
		marginTop: "auto",
		position: "fixed",
		left: 0,
		bottom: 0,
		opacity: "0.9",
		right: 0,
		height: "60px",
		backgroundColor: theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800]
	}
}));

const Footer = (props: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<Typography variant="body1">ViadeEs3c</Typography>
					<Copyright />
				</Container>
			</footer>
		</div>
	);
};

export default withTranslation()(Footer);
