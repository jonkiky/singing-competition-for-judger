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
        id:parseInt(song.id),  
        score:parseInt(song.score),
        score_cate1: 0, 
        score_cate2: 0, 
        score_cate3: 0, 
        score_cate4: 0, 
        score_cate5: 0, 
        score_cate6: 0, 
      });
      return song;
  })
}
  updateJudgeVote(db_vote);
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
    if(id == vote.id) {
      if(value=="" || Number.isInteger(parseInt(value))){
        if(value=="") value = 0;
        if(parseInt(value)>range ||  parseInt(value)<0){
         toast.error("The rate is out of range, please make sure the range is 0 - " + range.toString())
         toast.clearWaitingQueue();
         hasWarning= true;
      }else{
        vote["score"] = value;
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



// Du change
const columns_cate1 = [
  {
    name: '节目编号',
    selector: row => {
      return row.SongId
      },
      maxWidth : "50px"
  },
  {
    name: '节目',
    selector: row =>{
       return  <div style={{"minWidth":"250px"}}> {row.SongName}</div>;
    },
    minWidth : "250px"
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
      maxWidth : "100px"
  },
  {
    name: '评委评分',
    selector: row => {
      return  <div> <input type="text" className="form-control form-control-short-50" defaultValue={row.score} name="cf-name"  
      onChange={(event)=>handleChange(row.id,event.target.value,"score",100)}/></div>
      },
    maxWidth : "125px"
  }
]


const data = votes.length?votes: [];
const data_cate1 = data.length>0? data.filter(song => song.cate=="1"):[];
const data_cate2 = data.length>0? data.filter(song => song.cate=="2"):[];
const data_cate3 = data.length>0? data.filter(song => song.cate=="3"):[];
const data_cate4 = data.length>0? data.filter(song => song.cate=="4"):[];
const data_cate5 = data.length>0? data.filter(song => song.cate=="5"):[];


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
                          In this page, you will see sections,each section contains multi-songs for rating.
                          </p>
                          <p className="text-white">
                          You can submit your ratings by clicking the submit button.
                          Thank you !
                          </p>
                         </div>
                    </div>
                     <div className="row" style={{"position": "sticky", "top": "0","zIndex": "999"}}>
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
                                 <h4 className="text-white"> 原创歌曲 </h4>
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
                                <h4 className="text-white"> 通俗唱法 </h4>
                                 <DataTable
                                      columns={columns_cate1}
                                      data={data_cate2}
                                      progressPending={props.loading} 
                                  />
                              </div>
                              
                         </div>

                    </div>
                     <div className="row">
                        <div className="col-lg-12 col-md-12 mx-auto col-12">
                              <div className="mt-5">
                                <h4 className="text-white"> 美声唱法 </h4>
                                 <DataTable
                                      columns={columns_cate1}
                                      data={data_cate3}
                                      progressPending={props.loading} 
                                  />
                              </div>
                              
                         </div>

                    </div>
                     <div className="row">
                        <div className="col-lg-12 col-md-12 mx-auto col-12">
                              <div className="mt-5">
                                <h4 className="text-white"> 民族唱法 </h4>
                                 <DataTable
                                      columns={columns_cate1}
                                      data={data_cate4}
                                      progressPending={props.loading} 
                                  />
                              </div>
                              
                         </div>

                    </div>
                     <div className="row">
                        <div className="col-lg-12 col-md-12 mx-auto col-12">
                              <div className="mt-5">
                                <h4 className="text-white"> 戏曲 </h4>
                                 <DataTable
                                      columns={columns_cate1}
                                      data={data_cate5}
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
