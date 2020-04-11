import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { cyan } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
// eslint-disable-next-line
import { Player } from "video-react";

const getMediaComponent = (url) => {
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
    var j;
    var arr = [];

    if(media.mult.length<=0){
       j = (<Slide
          media={ <img id="img" src={"img/illustration-noresults.png"} 
          width={640} height={360} />}
          mediaBackgroundStyle={{ backgroundColor: cyan[600] }}
          key={Date.now()}
          style={{ backgroundColor: cyan[400] }}
          title={"Sorry :("}
          subtitle={"seems like there is no media uploaded for this route"}
        />)
         arr.push(j);
    }

    for (var i = 0; i < media.mult.length; i++) {
      
      j = (<Slide
          media={getMediaComponent(media.mult[i].url)}
          mediaBackgroundStyle={{ backgroundColor: cyan[600] }}
          style={{ backgroundColor: cyan[400] }}
           title={"Archivo multimedia de la ruta " + media.name}
            key={media.mult[parseInt(i)].date}
          subtitle={media.mult[parseInt(i)].date}
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

function MultsButton(params, name) {
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
        name={name}
      />
    </>
  );
}

export default MultsButton;
