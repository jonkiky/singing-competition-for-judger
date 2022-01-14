import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import { ToastContainer, toast } from 'react-toastify';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import 'react-toastify/dist/ReactToastify.css';
import BootstrapDialogTitle from './BootstrapDialogTitle';
import { useUpdateMutation } from "./updateMutation";
import { useLogout } from "../auth/auth";



function View(props) {


const [updateJudgeVote] = useUpdateMutation();
const logout = useLogout();
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
   '& .MuiDialog-paper': {
    minWidth: "500px",
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const [votes, setVotes] = useState([]);
const [open, setOpen] = React.useState(false);
const [disableSubmit, setDisableSubmit] = React.useState(false);

useEffect(() => {
  let db_vote = []
  if(props.data){
     setVotes(props.data.songListJudages);
  }
},[props.data])

const handleDialogOpen = () => {
    setOpen(true);
  };
const handleDialogClose = () => {
    setOpen(false);
  };

const handleConfirm=()=>{
  setOpen(false);
  let db_vote = []
  if(votes.length>0){
    votes.map(song=>{
      db_vote.push({ 
        id:song.id,  
        score:song.score,
        score_cate1: song.score_cate1, 
        score_cate2: song.score_cate2, 
        score_cate3: song.score_cate3, 
        score_cate4: song.score_cate4, 
        score_cate5: song.score_cate5, 
        score_cate6: song.score_cate6, 
      });
      return song;
  })
}
  updateJudgeVote(db_vote);
  //logout();
};

const onCancel=()=>{
  logout();
}


const onSubmit= ()=>{
   setOpen(true);
}

const handleChange=(id,value,cate,range)=>{
  let localVote =JSON.parse(JSON.stringify(votes));
  let hasWarning= false;
  let updatedVote = localVote.map(vote=>{
    if(vote.id ===id){
      vote[cate] =value;
      if(value=="" || Number.isInteger(parseInt(value))){
        if(value=="") value = 0;
        if(parseInt(value)>range ||  parseInt(value)<0){
         toast.error("The rate is out of range, please make sure the range is 0 - " + range.toString())
         toast.clearWaitingQueue();
         hasWarning= true;
      }else{
        vote["score"] = parseInt(vote.score_cate1)+parseInt(vote.score_cate2)+parseInt(vote.score_cate3)+parseInt(vote.score_cate4)+parseInt(vote.score_cate5)+parseInt(vote.score_cate6)
  
        }
      }else{
        toast.error("Please type a number and make sure the range is 0 - " + range.toString())
        toast.clearWaitingQueue();
      }
    }
    return vote;
  })
  if(!hasWarning){
    setVotes(updatedVote);
  }
}

const getScoreValue=()=>{
  return 111;
}

// Du change
const columns_cate1 = [
  {
    name: '节目',
    selector: row => {
      return row.SongName
      },
  },
  {
    name: '节目链接',
    selector: row => {
      return <a
        href={row.SongLink}
        target="external-url"
      >
        <PlayCircleFilledWhiteIcon/>
      </a>
      },
  },
  {
    name: '总分（满分100）',
    selector: row => {
       return  <div style={{"width":"80px"}}> {row.score}</div>;
    },
     minWidth : "200"
  },
  {
    name: '音准(20%)',
    selector: row => {
      return  <input type="text" className="form-control" defaultValue={row.score_cate1} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate1",20)}/>
      },
  },
   {
    name: '音色(20%)',
    selector: row => {
       return  <input type="text" className="form-control" defaultValue={row.score_cate2} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate2",20)}/>
      },
  },
  {
    name: '歌曲处理(20%)',
    selector: row => {
       return  <input type="text" className="form-control" defaultValue={row.score_cate3} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate3",20)}/>
      },
      minWidth : "200"
  },
  {
    name: '节奏(20%)',
    selector: row => {
       return  <input type="text" className="form-control" defaultValue={row.score_cate4} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate4",20)}/>
      },
  },
  {
    name: '咬字(20%)',
    selector: row => {
       return  <input type="text" className="form-control" defaultValue={row.score_cate5} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate5",20)}/>
      },
  },
  {
    name: '节目编号',
    selector: row => {
      return row.SongId
      },
  },
  {
    name: '名字',
    selector: row => {
      return row.name
      },
  },
  {
    name: '校友',
    selector: row => {
      return row.school
      },
  },

  {
    name: '唱法',
    selector: row => {
      return row.style1
      },
  },
  {
    name: '分组',
    selector: row => {
      return row.group
      },
  }
]

// he chang
const columns_cate2 = [
  {
    name: '节目',
    selector: row => {
      return row.SongName
      },
  },
  {
    name: '节目链接',
    selector: row => {
      return <a
        href={row.SongLink}
        target="external-url"
      >
        <PlayCircleFilledWhiteIcon/>
      </a>
      },
  },
  {
    name: '总分（满分100）',
    selector: row => {
        return  <div style={{"width":"80px"}}> {row.score}</div>;
    },
    minWidth : "200"
  },
  {
    name: '音准(15%)',
    selector: row => {
     return  <input type="text" className="form-control" defaultValue={row.score_cate1} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate1",15)}/>
      },
  },
   {
    name: '音色(15%)',
    selector: row => {
      return  <input type="text" className="form-control" defaultValue={row.score_cate2} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate2",15)}/>
      },
  },
  {
    name: '歌曲处理(15%)',
    selector: row => {
      return  <div> <input type="text" className="form-control" defaultValue={row.score_cate3} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate3",15)}/></div>
      },
    minWidth : "200"
  },
  {
    name: '节奏(15%)',
    selector: row => {
      return  <input type="text" className="form-control" defaultValue={row.score_cate4} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate4",15)}/>
      },
  },
  {
    name: '默契(25 %)',
    selector: row => {
      return  <input type="text" className="form-control" defaultValue={row.score_cate6} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate6",25)}/>
      },
  },
  {
    name: '咬字(15%)',
    selector: row => {
      return  <input type="text" className="form-control" defaultValue={row.score_cate5} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score_cate5",15)}/>
      },
  },
  {
    name: '节目编号',
    selector: row => {
      return row.SongId
      },
  },
  {
    name: '名字',
    selector: row => {
      return row.name
      },
  },
  {
    name: '校友',
    selector: row => {
      return row.school
      },
  },
  {
    name: '唱法',
    selector: row => {
      return row.style1
      },
  },
  {
    name: '分组',
    selector: row => {
      return row.group
      },
  }
]

const data = votes.length?votes: [];
const data_cate1 = data.length>0? data.filter(song => song.cate==1):[];
const data_cate2 = data.length>0? data.filter(song => song.cate==2):[];

  return (
  	  <section className="hero-list d-flex flex-column justify-content-center align-items-center">
       <ToastContainer />
      <BootstrapDialog
        onClose={handleDialogClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleDialogClose}>
          Ready to Submit
        </BootstrapDialogTitle>
        <DialogContent>
           
           <p>Thank you for your rating.</p>
           <p>Click Submit button to confirm your rating.</p>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirm} disabled = {disableSubmit}>
            Confirm and Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>

            <div className="bg-overlay-list"></div>
               <div className="container">
                    <div className="row">
                         <div className="col-lg-12 col-md-12 mx-auto col-12">
                          <h3 className="text-white" >Welcome to the NAAAC Judger Protal</h3>
                          <br/>
                          <p className="text-white">
                          Thank you for using NAAAC Judger Protal.
                          </p>
                           <p className="text-white">
                          In this page, you will see two sections,each section contains multi-songs for rating.
                          </p>
                          <ul>
                            <li className="text-white">Section 1 is 独唱. </li>
                            <li className="text-white">Section 2 is 合唱.</li>
                          </ul>
                          <p className="text-white">
                          You can submit your ratings by clicking the submit button. You will logout after the submit. 
                          You can change your mind by relogin to the system. 
                          Thank you !
                          </p>
                         </div>
                    </div>
                     <div className="row">
                      <div className="col-lg-6 col-md-2  col-sm-12"></div>
                          <div className="col-lg-3 col-md-5 col-sm-12 ">
                              <button type="button" className="form-control" id="submit-button" onClick={onSubmit}>Submit my votes</button>
                          </div>
                          <div className="col-lg-3 col-md-5   col-sm-12 ">
                                <button type="button" className="form-control" onClick={onCancel}>logout</button>
                          </div>
                    </div>
                    <div className="row">
                         <div className="col-lg-12 col-md-12 mx-auto col-12">
                              <div className="mt-5">
                                 <h4 className="text-white"> 独唱 </h4>
                                 <DataTable
                                      columns={columns_cate1}
                                      data={data_cate1}
                                      progressPending={props.loading} 
                                  />
                              </div>
                         </div>

                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 mx-auto col-12">
                              <div className="mt-5">
                                <h4 className="text-white"> 合唱 </h4>
                                 <DataTable
                                      columns={columns_cate2}
                                      data={data_cate2}
                                      progressPending={props.loading} 
                                  />
                              </div>
                              
                         </div>

                    </div>
               </div>
     </section>
  );
}

export default View;
