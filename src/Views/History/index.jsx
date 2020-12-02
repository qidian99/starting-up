import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { GAME_QUERY } from "../../gql";
import GameLayout from "../../layouts/GameLayout";
import _ from "lodash";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Box } from "@material-ui/core";
import { Game, simpleGameInitialUsers, simpleGameStrategies } from "starting-up-common";
import { useCallback } from "react";
import GameProgress from "../../components/game/GameProgress";
import Terrian from "../../components/game/Terrian";
import GameStatus from "../../components/game/GameStatus";

const useStyles = makeStyles({
  slider: {
    width: 300,
  },
});

function cycleValueText(value) {
  return `Cycle ${value}`;
}

const History = () => {
  let { gameId } = useParams();

  const gameState = useSelector((state) => state.game);
  const companyState = useSelector((state) => state.company);
  const [cycles, setCycles] = useState(0);
  const [strategy, setStrategy] = useState({});

  const gameSetting = Object.keys(strategy).map((s) => ({
    name: s,
    value: strategy[s],
  }));

  const [gameError, setGameError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [gameInstance, setGameInstance] = useState(new Game());
  const [gameRegions, setGameRegions] = useState([]);
  const [gameCycle, setGameCycle] = useState(gameInstance.cycle || 0);
  const [gameStatus, setGameStatus] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  // console.log({ currentPlayer });

  const history = useHistory();
  const setGameLogs = useCallback(
    (lgs) => {
      setLogs(lgs);
    },
    [setLogs]
  );

  const { loading: gameLoading, data: gameQueryResult } = useQuery(GAME_QUERY, {
    variables: {
      gameId,
    },
  });

  const onExitClick = useCallback(() => {
    history.push("/");
  }, [history]);

  useEffect(() => {
    // console.log(gameQueryResult);
    if (!gameQueryResult) return;

    setGameInstance(new Game(gameQueryResult.game));
    const player = _.get(gameQueryResult, ["game", "companies", '0', "id"]);
    const s = _.pick(_.get(gameQueryResult, ["game", "companies", "0", "strategy"]), simpleGameStrategies);
    // console.log({ player, s })
    setCurrentPlayer(player);
    setStrategy(s);
    const status = _.chain(gameQueryResult)
      .get(["game", "companies"])
      .map((c) => ({
        ...c,
        company: {
          name: c.name,
        },
        revenue: c.fund,
        numUsers: simpleGameInitialUsers,
        numRegions: 1,
      }))
      .value();
    setGameStatus(status);
    // console.log({status})


    const updates = _.get(gameQueryResult, ["game", "update"]);
    const maxCycles = _.chain(updates)
      .filter({
        __typename: "ComponentGameInfoUpdate",
      })
      .maxBy("cycle")
      .value();
    if (!maxCycles) return;
    // console.log({ updates, maxCycles });
    setCycles(maxCycles.cycle);
  }, [gameQueryResult]);

  useEffect(() => {
    // console.log(gameInstance);
  }, [gameInstance]);

  const handleCycleChange = useCallback(
    (event, newCycle) => {
      if (newCycle === gameCycle) return;
      gameInstance.goto(newCycle);
      setGameCycle(newCycle);
      setGameRegions(_.orderBy(gameInstance.regions, ["index"], ["asc"]));
      setGameStatus(
        gameInstance.companies.map((c) =>
          _.merge(
            {
              ...c,
              company: {
                name: c.name,
              },
              revenue: c.fund,
              numUsers: simpleGameInitialUsers,
              numRegions: 1,
            },
            _.find(gameInstance.status, { company: { id: c.id } })
          )
        )
      );
      setGameLogs(gameInstance.logs);
      // console.log(gameInstance);
    },
    [setGameCycle, setGameLogs, gameInstance, gameCycle]
  );

  if (gameLoading) {
    return <Spinner />;
  }

  return (
    <GameLayout
      logs={logs}
      setting={gameSetting}
      progress={{
        cycle: gameCycle,
        numCycles: gameInstance.numCycles,
        fundings: _.orderBy(gameInstance.fundings, ["cycle"], ["asc"]),
      }}
      status={_.map(
        gameStatus,
        _.partialRight(_.pick, ["company", "revenue", "numUsers", "numRegions"])
      )}
      onExitClick={onExitClick}
    >
      <Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box padding={4} flex={1} justifyContent="center" display="flex">
            <GameProgress
              cycle={gameCycle}
              fundings={_.orderBy(gameInstance.fundings, ["cycle"], ["asc"])}
            />
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
          <Box padding={4} flex={1} justifyContent="center" display="flex">
            <GameStatus companies={gameStatus} />
          </Box>
        </Box>
        <Slider
          defaultValue={0}
          onChange={handleCycleChange}
          getAriaValueText={cycleValueText}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={cycles}
        />
      </Box>
    </GameLayout>
  );
};

export default History;
