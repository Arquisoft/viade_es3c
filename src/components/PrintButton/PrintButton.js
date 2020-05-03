import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PrintButton = ({ id, label, route, hid }) => (
	<div className="tc mb4 mt2">
		<div id="myMm" style={{ height: "1mm" }} />

		<div
			id="print"
			className="pa2 ba bw1 b--black bg-yellow black-90 br2 dib pointer dim shadow-1"
			onClick={() => {
				document.getElementById(hid).style.visibility = "hidden";
				const input = document.getElementById(id);
				var pdf = null;

				html2canvas(input, {
					backgroundColor: null,
					useCORS: true,
					allowTaint: false,
					scrollY: -window.scrollY
				}).then((canvas) => {
					var imgData = canvas.toDataURL("image/png", 1.0);
					pdf = new jsPDF();
					pdf.addImage(imgData, "PNG", 20, 20, 160, 200);
					if (route.multimedia.length > 0) {
						pdf.addPage();
						const promises = [];
						for (var i = 0; i < route.multimedia.length; i++) {
							var genImg = new Image();
							genImg.setAttribute("crossOrigin", "anonymous");
							var r = route.multimedia[i];
							promises.push(
								// eslint-disable-next-line
								route.multimedia[i].data.then((blob) => {
									genImg.src = URL.createObjectURL(blob);
									pdf.addImage(genImg, "PNG", 10, 10, 190, 180);
									pdf.setFont("courier");
									pdf.setFontType("normal");
									pdf.setFontSize(10);
									pdf.text(10, 200, `by: ${r.author}`);
									pdf.text(10, 210, `at: ${r.date}`);
									if (pdf.getNumberOfPages() < route.multimedia.length + 1) {
										pdf.addPage();
									}
								})
							);
						}

						Promise.all(promises).then((e) => pdf.save(`${route.name}.pdf`));
					} else {
						pdf.save(`${route.name}.pdf`);
					}
				});
				document.getElementById(hid).style.visibility = "visible";
			}}
		>
			{label}
		</div>
	</div>
);

export default PrintButton;
