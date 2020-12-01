import { Button } from "@material-ui/core";
import React from "react";
import { PlayState, Tween } from "react-gsap";
import { Controller, Scene } from "react-scrollmagic";
import { APP_BAR_HEIGHT_INT, ActionButtonContainer } from "../../styled";
import { FADE_OUT_OFFSET, TRIGGER_OFFSET } from "./default";

const ActionButton = ({ duration, trigger, title, onClick, children }) => {
  return (
    <Controller>
      <Scene
        duration={duration}
        triggerElement={trigger}
        // indicators
        // triggerHook={0.5}
        // triggerHook={
        //   APP_BAR_HEIGHT_INT / window.innerHeight +
        //   TRIGGER_OFFSET +
        //   FADE_OUT_OFFSET
        // }
        triggerHook={APP_BAR_HEIGHT_INT / window.innerHeight + TRIGGER_OFFSET}
      >
        {(progress) => {
          if (progress === 0)
            return (
              <ActionButtonContainer style={{ display: "none" }}>
                {children}
              </ActionButtonContainer>
            );
          return (
            <ActionButtonContainer>
              <Tween
                from={{ opacity: 0 }}
                progress={progress * 10 < 1 ? progress * 10 : 1}
                playState={progress > 0 ? PlayState.play : PlayState.pause}
              >
                <div>{children}</div>
              </Tween>
              <Tween
                from={{ opacity: 0, transform: "translate3d(100vw, 0, 0)" }}
                ease="back.out(1.2)"
                // {...(progress === 0 ? { progress: 0 } : {})}
                playState={progress > 0 ? PlayState.play : PlayState.pause}
              >
                <Button
                  style={{ position: "absolute", bottom: 32, right: 32 }}
                  onClick={onClick}
                  variant="contained"
                  color="primary"
                >
                  {title || "Next Section"}
                </Button>
              </Tween>
            </ActionButtonContainer>
          );
        }}
      </Scene>
    </Controller>
  );
};

export default ActionButton;

ActionButton.defaultProps = {
  duration: 0,
  onClick: () => {},
};
