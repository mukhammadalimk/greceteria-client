import { createContext, useEffect, useReducer } from "react";
import { NewsItemTypes } from "../utils/user-types";
import { getNewsApi } from "../api/news";

interface NewsInitialStateTypes {
  news: NewsItemTypes[];
  newsItem: NewsItemTypes | null;
  newsLoading: boolean;
  newsItemLoading: boolean;
  addUpdateDeleteLoading: boolean;
  newsItemRefs: Array<HTMLTextAreaElement> | null;
  error: string | null;
}

// An enum with all the types of actions to use in our reducer
export enum NewsActionKind {
  GET_NEWSITEM_START = "GET_NEWSITEM_START",
  GET_NEWSITEM_SUCCESS = "GET_NEWSITEM_SUCCESS",
  GET_NEWSITEM_FAILURE = "GET_NEWSITEM_FAILURE",

  GET_NEWS_START = "GET_NEWS_START",
  GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS",
  GET_NEWS_FAILURE = "GET_NEWS_FAILURE",

  ADD_NEWSITEM_START = "ADD_NEWSITEM_START",
  ADD_NEWSITEM_SUCCESS = "ADD_NEWSITEM_SUCCESS",
  ADD_NEWSITEM_FAILURE = "ADD_NEWSITEM_FAILURE",

  UPDATE_NEWSITEM_START = "UPDATE_NEWSITEM_START",
  UPDATE_NEWSITEM_SUCCESS = "UPDATE_NEWSITEM_SUCCESS",
  UPDATE_NEWSITEM_FAILURE = "UPDATE_NEWSITEM_FAILURE",

  DELETE_NEWSITEM_START = "DELETE_NEWSITEM_START",
  DELETE_NEWSITEM_SUCCESS = "DELETE_NEWSITEM_SUCCESS",
  DELETE_NEWSITEM_FAILURE = "DELETE_NEWSITEM_FAILURE",

  SET_REFS = "SET_REFS",
}

// An interface for our actions
export interface NewsAction {
  type: NewsActionKind;
  payload?: NewsItemTypes | NewsItemTypes[] | Array<HTMLTextAreaElement> | [];
  error?: string;
}

const INITIAL_STATE: NewsInitialStateTypes = {
  news: [],
  newsItem: null,
  newsLoading: false,
  newsItemLoading: false,
  addUpdateDeleteLoading: false,
  newsItemRefs: null,
  error: null,
};

interface NewsContextTypes {
  state: NewsInitialStateTypes;
  dispatch: React.Dispatch<NewsAction>;
}

export const NewsContext = createContext<NewsContextTypes>({
  state: INITIAL_STATE,
  dispatch: () => {},
});

const NewsReducer = (
  state: NewsInitialStateTypes,
  action: NewsAction
): typeof INITIAL_STATE => {
  switch (action.type) {
    case NewsActionKind.GET_NEWS_START:
      return { ...state, newsLoading: true, error: null };
    case NewsActionKind.GET_NEWS_SUCCESS:
      return {
        ...state,
        news: action.payload as NewsItemTypes[],
        newsLoading: false,
        error: null,
      };
    case NewsActionKind.GET_NEWS_FAILURE:
      return {
        ...state,
        news: [],
        newsLoading: false,
        error: action.error!,
      };

    case NewsActionKind.GET_NEWSITEM_START:
      return { ...state, newsItem: null, newsItemLoading: true, error: null };
    case NewsActionKind.GET_NEWSITEM_SUCCESS:
      return {
        ...state,
        newsItem: action.payload as NewsItemTypes,
        newsItemLoading: false,
        error: null,
      };
    case NewsActionKind.GET_NEWSITEM_FAILURE:
      return {
        ...state,
        newsItem: null,
        newsItemLoading: false,
        error: action.error!,
      };

    case NewsActionKind.ADD_NEWSITEM_START:
      return { ...state, addUpdateDeleteLoading: true, error: null };
    case NewsActionKind.ADD_NEWSITEM_SUCCESS:
      return {
        ...state,
        news: [action.payload as NewsItemTypes, ...state.news],
        addUpdateDeleteLoading: false,
        error: null,
      };
    case NewsActionKind.ADD_NEWSITEM_FAILURE:
      return { ...state, addUpdateDeleteLoading: false, error: action.error! };

    case NewsActionKind.UPDATE_NEWSITEM_START:
      return { ...state, addUpdateDeleteLoading: true, error: null };
    case NewsActionKind.UPDATE_NEWSITEM_SUCCESS:
      const updatedItemIndex = state.news.findIndex(
        (item) => item._id === (action.payload as NewsItemTypes)._id
      );
      const newsCopy: NewsItemTypes[] = [...state.news];
      newsCopy[updatedItemIndex] = action.payload as NewsItemTypes;
      return {
        ...state,
        news: newsCopy,
        newsItem: action.payload as NewsItemTypes,
        addUpdateDeleteLoading: false,
        error: null,
      };
    case NewsActionKind.UPDATE_NEWSITEM_FAILURE:
      return { ...state, addUpdateDeleteLoading: false, error: action.error! };

    case NewsActionKind.DELETE_NEWSITEM_START:
      return { ...state, addUpdateDeleteLoading: true, error: null };
    case NewsActionKind.DELETE_NEWSITEM_SUCCESS:
      return {
        ...state,
        news: state.news.filter((i) => i._id !== state.newsItem?._id),
        addUpdateDeleteLoading: false,
        error: null,
      };
    case NewsActionKind.DELETE_NEWSITEM_FAILURE:
      return { ...state, addUpdateDeleteLoading: false, error: action.error! };

    case NewsActionKind.SET_REFS:
      return {
        ...state,
        newsItemRefs: action.payload as Array<HTMLTextAreaElement>,
      };

    default:
      return state;
  }
};

export const NewsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(NewsReducer, INITIAL_STATE);

  const getNews = async () => await getNewsApi(dispatch);

  // Fetch news on every refresh to keep the data up to date with the database.
  useEffect(() => {
    getNews();
  }, []);

  const values = {
    state,
    dispatch,
    getNews,
  };

  return <NewsContext.Provider value={values}>{children}</NewsContext.Provider>;
};