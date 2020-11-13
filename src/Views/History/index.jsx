import React from "react";
import { useParams } from "react-router-dom";
import GameLayout from "../../layouts/GameLayout";

const History = () => {
  let { gameId } = useParams();

  return (
    <GameLayout>
      <p>{gameId}</p>
    </GameLayout>
  );
};

export default History;
