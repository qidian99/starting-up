import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


const withGameValidator = (WrappedComponent) => {

  return (props) => {
    const gameState = useSelector((state) => state.game);
    const companyState = useSelector((state) => state.company);
    const history = useHistory();

    if (gameState.newGame === false && !gameState.game) {
      history.push('/');
      return <></>;
    } 

    if (!companyState.active) {
      history.push("/");
      return <></>;
    }
    
    return <WrappedComponent {...props} />;
  }
}

export default withGameValidator;
