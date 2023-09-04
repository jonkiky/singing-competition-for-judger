import React from "react";
import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";
import View from "./View"
import HomeView from "../home/HomeView"
import { useAuthToken } from "../auth/auth";

const GET_SONG_LIST = gql`
query songListJudages($password: String!,$email: String!) {
  songListJudages(query: {password: $password, email: $email}) {
    SongId
    SongLink
    SongName
    id
    cate
    email
    group
    password
    score
    style1
    style2
  }
  }`;

function ListController(props) {

  // check access token is presented or not
  const [cookie] = useAuthToken();
  
  let token = "";
  let email = "" 
  if(cookie && cookie!==null){
    token = cookie.split('&&')[0];
    email = cookie.split('&&')[1];
  }

 let { loading, error, data } = useQuery(GET_SONG_LIST,{
	    variables: { 
	    	password: token,
        email: email
	     },
	 });

 if (error) return <HomeView warning/>;
 if (typeof(token) === 'undefined' || token === "") {
 		return <HomeView />;
 }
 return <View loading={loading} error={error}  data={ data } token={token} />
}
export default ListController;