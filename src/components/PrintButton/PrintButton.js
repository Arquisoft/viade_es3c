import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const pxToMm = (px) => {
	return Math.floor(px / document.getElementById("myMm").offsetHeight);
};

const mmToPx = (mm) => {
	return document.getElementById("myMm").offsetHeight * mm;
};

const range = (start, end) => {
	return Array(end - start).join(0).split(0).map(function(val, id) {
		return id + start;
	});
};

const PrintButton = ({ id, label, route }) => (
	<div className="tc mb4 mt2">
		<div id="myMm" style={{ height: "1mm" }} />

		<div
			className="pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
			onClick={() => {
				const input = document.getElementById(id);
				var pdf = null;

				html2canvas(input, {
					backgroundColor: null,
					useCORS: true,
					allowTaint: true,
					scrollY: -window.scrollY
				}).then((canvas) => {
					var imgData = canvas.toDataURL("image/png", 1.0);

					pdf = new jsPDF();

					pdf.addImage(imgData, "PNG", 10, 10, 190, 190);

					//if (route.multimedia.length > 0) {
					//	for (var i = 0; i < route.multimedia.length; i++) {
					//		pdf.addPage();
					//		var genImg = new Image();
					//		genImg.setAttribute("crossOrigin", "anonymous");
					//		genImg.src = route.multimedia[i].url;

					//		pdf.addImage(genImg, "PNG", 10, 10, 190, 150);
					//		pdf.text(10, 170, `${route.multimedia[i].name}`);
					//		pdf.text(10, 180, `${route.multimedia[i].author}`);
					//		pdf.text(10, 190, `${route.multimedia[i].date}`);
					//	}
					//	}
					pdf.save(`${route.name}.pdf`);
				});
			}}
		>
			{label}
		</div>
	</div>
);

export default PrintButton;
