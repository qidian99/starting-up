import { compose } from "redux";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/client";
import GameLayout from "../../layouts/GameLayout";
import AuthForm from "../../components/AuthForm";
import { useHistory } from "react-router-dom";

import React, { Fragment, useCallback, useEffect, useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  Input,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Box,
  TextField,
  Typography,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useToasts } from "react-toast-notifications";

import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION, SIGNUP_MUTATION } from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";
import DashboardMenu from "../../components/DashboardMenu";

import { CREATE_SIMPLE_GAME_MUTATION } from "../../gql";
import { GAME_ACTIONS } from "../../util/game";
import Terrian from "../../components/game/Terrian";
import GameProgress from "../../components/game/GameProgress";
import GameStatus from "../../components/game/GameStatus";

import { simpleGameHeight, simpleGameWidth, Game } from "starting-up-common";
import { GridLoader } from "react-spinners";
import { appTheme } from "../../theme";

export default () => {
  const gameState = useSelector((state) => state.game);
  const [createSimpleGame, { data: gameResponse }] = useMutation(
    CREATE_SIMPLE_GAME_MUTATION
  );
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const [gameError, setGameError] = useState(null);

  const [gameInstance, setGameInstance] = useState(null);

  useEffect(() => {
    console.log(gameState);
    const { newGame, game } = gameState;

    if (newGame) {
      createSimpleGame().catch((e) => {
        console.log(e);
        setGameError("Simple game creation failed");
      });
    }

    if (game) {
      setGameInstance(new Game(game));
    }
  }, [gameState, createSimpleGame]);

  useEffect(() => {
    console.log({
      gameInstance,
    });
  }, [gameInstance]);

  useEffect(() => {
    console.log(gameResponse);
    if (!gameResponse) return;
    const { createSimpleGame: game } = gameResponse;

    dispatch({
      type: GAME_ACTIONS.ENTER_GAME,
      game,
    });
  }, [gameResponse, dispatch]);

  useEffect(() => {
    if (gameError) {
      addToast(gameError, {
        appearance: "error",
        onDismiss: setGameError(null),
      });
    }
    return () => {};
  }, [addToast, gameError]);

  if (!gameInstance) {
    console.log("Game instance not instantiated.");
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <GridLoader size={24} color={appTheme.palette.primary.main} />
      </Box>
    );
  }

  return (
    <GameLayout>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box padding={4} flex={1}>
          <GameProgress />
        </Box>
        <Terrian width={gameInstance.width} height={gameInstance.height} />
        <Box padding={4} flex={1} justifyContent="flex-end" display="flex">
          <GameStatus companies={gameInstance.companies} />
        </Box>
      </Box>
    </GameLayout>
  );
};
