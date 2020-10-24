import { compose } from "redux";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { useSubscription, useQuery } from "@apollo/client";
import AuthLayout from "../../layouts/AuthLayout";
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
import {
  LOGIN_MUTATION,
  REGISTER_COMPANY_MUTATION,
  SIGNUP_MUTATION,
} from "../../gql";
import { AUTH_ACTIONS, AUTH_FORM_MODE } from "../../util";
import { useSelector, useDispatch } from "react-redux";
import CompanyForm from "../../components/CompanyForm";
import { COMPANY_ACTIONS } from "../../util/company";
import { GAME_ACTIONS } from "../../util/game";

export default () => {
  const [error, setError] = useState(null);
  const [registerCompany, { data: companyResponse }] = useMutation(
    REGISTER_COMPANY_MUTATION
  );

  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const history = useHistory();

  const onButtonClick = useCallback(
    (name, strategy) => {
      console.log(name, strategy);
      // Register the company
      registerCompany({ variables: { name, strategy } }).catch((e) => {
        setError("Register company failed");
      });
    },
    [registerCompany]
  );

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", onDismiss: setError(null) });
    }
    return () => {};
  }, [addToast, error]);

  useEffect(() => {
    console.log(companyResponse);
    if (companyResponse) {
      async function setCompany() {
        const { registerCompany: company } = companyResponse;

        const res = await dispatch({
          type: COMPANY_ACTIONS.REGISTER_COMPANY,
          company,
        });
        console.log("Register company result", res);
        await dispatch({
          type: COMPANY_ACTIONS.SET_ACTIVE_COMPANY,
          company,
        });
        await dispatch({
          type: GAME_ACTIONS.SET_NEW_GAME,
          value: true,
        });
        history.push("/simplegame");
      }
      setCompany();
    }
  }, [companyResponse, dispatch, history]);

  return (
    <AuthLayout>
      <CompanyForm onButtonClick={onButtonClick} />
    </AuthLayout>
  );
};
