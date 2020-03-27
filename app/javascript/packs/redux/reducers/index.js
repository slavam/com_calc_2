import { combineReducers } from "redux";
import tariffs from "./tariffs";
import categories from "./categories";

export default combineReducers({ categories, tariffs });
