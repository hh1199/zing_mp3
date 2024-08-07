import actionTypes from "../actions/actionTypes";

const initState = {
  banner: [],
  Friday: {},
  newEveryday: {},
  remix: {},
  top100: {},
  hotAlbum: {},
  isLoading: false,
  newRelease: {},
  weekChart: [],
  chart: {},
  rank: [],
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return {
        ...state,
        banner:
          action.homeData?.find((item) => item.sectionId === "hSlider")
            ?.items || null,
        friday:
          action.homeData?.find((item) => item.sectionId === "hSeasonTheme") ||
          {},
        newEveryday:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme") ||
          {},
        remix:
          action.homeData?.find((item) => item.sectionId === "hEditorTheme3") ||
          {},
        top100:
          action.homeData?.find((item) => item.sectionId === "h100") || {},
        hotAlbum:
          action.homeData?.find((item) => item.sectionId === "hAlbum") || {},
        newRelease:
          action.homeData?.find((item) => item.sectionType === "new-release") ||
          {},
        weekChart:
          action.homeData?.find((item) => item.sectionType === "weekChart")
            ?.items || [],
        chart:
          action.homeData?.find((item) => item.sectionId === "hZC")?.chart ||
          {},
        rank:
          action.homeData?.find((item) => item.sectionId === "hZC")?.items ||
          [],
      };

    case actionTypes.LOADING:
      return {
        ...state,
        isLoading: action.flag,
      };

    default:
      return state;
  }
};

export default appReducer;
