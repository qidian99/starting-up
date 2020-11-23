import { COMPANY_ACTIONS } from "../util/company";

const DEFAULT_COMPANY_STATE = {
  active: null,
  list: [],
}

const companyReducer = (state = DEFAULT_COMPANY_STATE, action) => {
  switch (action.type) {
    case COMPANY_ACTIONS.SET_ACTIVE_COMPANY: {
      const { company } = action;
      return {
        ...state,
        active: company
      };
    }
    case COMPANY_ACTIONS.REGISTER_COMPANY: {
      // const { company } = action;
      const newList = [...state.list];
      // newList.push(company)
      return {
        ...state,
        list: newList,
      };
    }
    default:
      return state;
  }
};

export default companyReducer;
