import React, { useState } from "react";
import { Button } from "./myroutes.style";
import { blueGrey } from "@material-ui/core/colors";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { PlayerDiv } from "./myroutes.style";
// eslint-disable-next-line
import i18n from "i18n";

const getMediaComponent = url => {
  if (url.includes(".mp4")) {
    return (
      <PlayerDiv>
        <video autoplay controls src={url} width="640" height="380"></video>
      </PlayerDiv>
    );
  } else {
    return (
      <img
        id="img"
        src={url}
       
        alt={"Media for the route"}
      />
    );
  }
};

const AutoRotatingCarouselModal = ({
  handleOpen,
  setHandleOpen,
  isMobile,
  media
}) => {
  function createSlides(media) {
    var j;
    var arr = [];

    if (media.mult.length <= 0) {
      j = (
        <Slide
          media={
            <img
              id="img"
              src={"img/illustration-noresults.png"}
              width={640}
              height={360}
              alt={"No media for this route"}
            />
          }
          mediaBackgroundStyle={{ backgroundColor: blueGrey[50] }}
          key={Date.now()}
          landscape={true}
          style={{ backgroundColor: blueGrey[600] }}
          title={i18n.t("myRoutes.noMultTitle")}
          subtitle={i18n.t("myRoutes.noMult")}
        />
      );
     return j;
    }

    for (var i = 0; i < media.mult.length; i++) {
      j = (
        <Slide
          media={getMediaComponent(media.mult[i].url)}
          mediaBackgroundStyle={{ backgroundColor: blueGrey[50] }}
          style={{ backgroundColor: blueGrey[600] }}
          title={media.name}
           landscape={true}
          key={media.mult[parseInt(i)].date}
          subtitle={media.mult[parseInt(i)].date}
        />
      );
      if(media.mult.length===1){
        return j;
      } else{
      arr.push(j);
    }}
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
        mobile={false}
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
  return (
    <>
      <Button data-testid="mult" id="mult" onClick={handleClick}>
        {i18n.t("myRoutes.viewMult")}
      </Button>
      <AutoRotatingCarouselModal
        isMobile={false}
        handleOpen={handleOpen}
        setHandleOpen={setHandleOpen}
        media={params}
        name={name}
      />
    </>
  );
}

export default MultsButton;
