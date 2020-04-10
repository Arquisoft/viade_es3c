import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { cyan } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
// eslint-disable-next-line
import { Player } from "video-react";

const AutoRotatingCarouselModal = ({
  handleOpen,
  setHandleOpen,
  isMobile,
  media
}) => {
  function createSlides(media) {
    var j;
    var arr = [];

    for (var i = 0; i < media.mult.length; i++) {
      j = (
        <Slide
          media={<img src={media.mult[i].url} alt={"Media de la ruta"+media.mult[i].name}/>}
          mediaBackgroundStyle={{ backgroundColor: cyan[600] }}
          style={{ backgroundColor: cyan[400] }}
          title= {media.mult[i].date}
          key = {media.mult[i].date}
        />
      );
      arr.push(j);
    }
    return arr;
  }
  return (
    <div>
      {/* <Button onClick={() => setHandleOpen({ open: true })}>Open carousel</Button> */}
      <AutoRotatingCarousel
        open={handleOpen.open}
        onClose={() => setHandleOpen({ open: false })}
        onStart={() => setHandleOpen({ open: false })}
        autoplay={false}
        mobile={isMobile}
        style={{ position: "absolute" }}
        media={media}
      >
        {createSlides(media)}
      </AutoRotatingCarousel>
    </div>
  );
};

function MultsButton(params) {
  const [handleOpen, setHandleOpen] = useState({ open: false });
  const handleClick = () => {
    setHandleOpen({ open: true });
  };
  const matches = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Button onClick={handleClick}>View Multimedia</Button>
      <AutoRotatingCarouselModal
        isMobile={matches}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
        media={params}
      />
    </>
  );
}

export default MultsButton;
