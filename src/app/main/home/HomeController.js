import React from "react";
import {  useLocation} from "react-router-dom";
import View from "./HomeView"

function HomeController(props) {
	let query = new URLSearchParams(useLocation().search);
	let isWarning =  query.get("warning") === null
  return  <View warning={!isWarning}/>
}
export default HomeController;