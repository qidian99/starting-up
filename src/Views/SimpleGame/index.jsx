import { compose } from "redux";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/client";
import GameLayout from "../../layouts/GameLayout";
import AuthForm from "../../components/AuthForm";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useState,
  useReducer,
} from "react";
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
import {
  JOIN_GAME_SUBSCRIPTION,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
} from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";
import DashboardMenu from "../../components/DashboardMenu";

import { CREATE_SIMPLE_GAME_MUTATION } from "../../gql";
import { GAME_ACTIONS } from "../../util/game";
import Terrian from "../../components/game/Terrian";
import GameProgress from "../../components/game/GameProgress";
import GameStatus from "../../components/game/GameStatus";

import {
  simpleGameHeight,
  simpleGameWidth,
  Game,
  TYPE_GAME_INFO_UPDATE,
  TYPE_GAME_REGION_UPDATE,
  TYPE_GAME_COMPANY_UPDATE,
  TYPE_GAME_FUNDING_UPDATE,
} from "starting-up-common";
import { GridLoader } from "react-spinners";
import { appTheme } from "../../theme";

const GameSubscription = ({
  company,
  gameInstance,
  setGameCycle,
  setGameLogs,
  setGameRegions,
  setGameStatus,
}) => {
  const { data: gameSubscription, loading } = useSubscription(
    JOIN_GAME_SUBSCRIPTION,
    {
      variables: {
        company: company.id,
        game: gameInstance.id,
      },
      // onSubscriptionData: (e) => console.log(e),
    }
  );

  useEffect(() => {
    if (!gameSubscription) {
      return;
    }
    console.log(gameSubscription);
    gameSubscription.joinGame.forEach((update) => {
      switch (update.__typename) {
        case TYPE_GAME_INFO_UPDATE: {
          gameInstance.updateGameInfo(update);
          // console.log(update);
          // console.log('setting game logs', gameInstance.logs)
          setGameCycle(update.cycle);
          break;
        }
        case TYPE_GAME_REGION_UPDATE: {
          gameInstance.updateGameRegion(update);
          setGameRegions(_.orderBy(gameInstance.regions, ["index"], ["asc"]));
          break;
        }
        case TYPE_GAME_COMPANY_UPDATE: {
          gameInstance.updateGameCompany(update);
          setGameStatus(gameInstance.status);
          break;
        }
        case TYPE_GAME_FUNDING_UPDATE: {
          gameInstance.updateGameFunding(update);
          setGameStatus(gameInstance.status);
          break;
        }
        default: {
        }
      }
    });
    setGameLogs(_.dropRight(gameInstance.logs, 100));
  }, [
    gameInstance,
    gameInstance.up,
    gameSubscription,
    setGameCycle,
    setGameLogs,
    setGameRegions,
    setGameStatus,
  ]);

  return <></>;
};

GameSubscription.prototype = {
  gameInstance: Game,
};

export default () => {
  const gameState = useSelector((state) => state.game);
  const companyState = useSelector((state) => state.company);
  const [createSimpleGame, { data: gameResponse }] = useMutation(
    CREATE_SIMPLE_GAME_MUTATION
  );

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const strategy = _.pick(companyState.active.strategy, [
    "preseed",
    "seed",
    "seriesA",
    "seriesB",
    "seriesC",
  ]);
  const [gameSetting] = useState(
    Object.keys(strategy).map((s) => ({ name: s, value: strategy[s]}))
  );

  const [gameError, setGameError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [gameInstance, setGameInstance] = useState(new Game());
  const [gameRegions, setGameRegions] = useState([]);
  const [gameCycle, setGameCycle] = useState(gameInstance.cycle || 0);
  const [gameStatus, setGameStatus] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(companyState.active.id);
  // console.log({ currentPlayer });

  const history = useHistory();
  const setGameLogs = useCallback(
    (lgs) => {
      setLogs(lgs);
    },
    [setLogs]
  );

  const onExitClick = useCallback(
    () => {
      history.push('/');
    },
    [history],
  )

  useEffect(() => {
    // console.log(gameState);
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
      gameStatus,
    });
  }, [gameStatus]);

  useEffect(() => {
    // console.log({
    //   logs,
    // });
  }, [logs]);

  useEffect(() => {
    // console.log(gameResponse);
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

  console.log("Fundings", gameInstance.fundings);

  return (
    <>
      {!gameState.newGame && gameInstance && (
        <GameSubscription
          gameInstance={gameInstance}
          company={companyState.active}
          setGameCycle={setGameCycle}
          setGameLogs={setGameLogs}
          setGameRegions={setGameRegions}
          setGameStatus={setGameStatus}
        />
      )}
      <GameLayout
        logs={logs}
        setting={gameSetting}
        progress={{
          cycle: gameCycle,
          numCycles: gameInstance.numCycles,
          fundings: gameInstance.fundings,
        }}
        status={_.map(
          gameStatus,
          _.partialRight(_.pick, [
            "company",
            "revenue",
            "numUsers",
            "numRegions",
          ])
        )}
        onExitClick={onExitClick}
      >
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box padding={4} flex={1}>
            <GameProgress cycle={gameCycle} fundings={gameInstance.fundings} />
          </Box>
          <Terrian
            counts={_.map(
              gameRegions,
              ({ users }) => users[currentPlayer] || 0
            )}
            regions={gameRegions}
            width={gameInstance.width}
            height={gameInstance.height}
          />
          <Box padding={4} flex={1} justifyContent="flex-end" display="flex">
            <GameStatus companies={gameStatus} />
          </Box>
        </Box>
      </GameLayout>
    </>
  );
};
