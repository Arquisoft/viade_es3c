import React, { useState } from "react";
// import Slide from "react-swipeable-views";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { lightGreen, cyan, green } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { Player } from "video-react";

const getMediaComponent = (url) => {
  console.log(url);
  if (url.includes('.mp4')) {
    return (<Player
      playsInline
      poster="/assets/poster.png"
      src={url}
      fluid={false}
      width={640}
      height={360}
    />)
  } else {
    return <img id="img" src={url} width={640}
    height={360} />
  }
}

const AutoRotatingCarouselModal = ({
  handleOpen,
  setHandleOpen,
  isMobile,
  media
}) => {
  function createSlides(media) {
    console.log(media);
    var j;
    var arr = [];

    for (var i = 0; i < media.mult.length; i++) {
      

      j = (<Slide
          media={getMediaComponent(media.mult[i].url)}
          mediaBackgroundStyle={{ backgroundColor: cyan[600] }}
          style={{ backgroundColor: cyan[400] }}
          title={media.mult[i].name}
        />)
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
