export const createPrePlanningReducer = (state = {}, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "CREATE_PRE_PLANNING_REQUEST":
      return { message: "", error: "", info: "request sent!" };
    case "CREATE_PRE_PLANNING_SUCCESS":
      return {
        message: action.payload.message,
        error: "",
        info: "",
        success: true,
      };
    case "CREATE_PRE_PLANNING_FAIL":
      return {
        message: "",
        error: action.payload,
        info: "",
        success: false,
      };
    default:
      return { message: "", error: "", info: "" };
  }
};

export const getPrePlanningBySubLocationReducer = (state = {}, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "GET_PRE_PLANNING_SUB_LOCATION_REQUEST":
      return { message: "", error: "", info: "request sent!", prePlanning: [] };
    case "GET_PRE_PLANNING_SUB_LOCATION_SUCCESS":
      return {
        message: "Success",
        error: "",
        info: "",
        success: true,
        prePlanning: action.payload,
      };
    case "GET_PRE_PLANNING_SUB_LOCATION_FAIL":
      return {
        message: "",
        error: action.payload,
        info: "",
        success: false,
        prePlanning: [],
      };
    default:
      return { message: "", error: "", info: "", prePlanning: [] };
  }
};