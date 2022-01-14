import React from 'react';

function Logout(props) {

  const onLogin =()=>{
    window.location.href = './';
  }
  return (
  	  <section className="hero d-flex flex-column justify-content-center align-items-center" id="home">
            <div className="bg-overlay"></div>
               <div className="container">
                    <div className="row">
                         <div className="col-lg-8 col-md-10 mx-auto col-12">
                              <div className="hero-text mt-5 text-center">
                                    <h4 className="text-white" >
                                      Thank you for using NAAAC-North America Alumni Alliance Cup Singing Competition Voting System</h4>
                                    <h4 className="text-white" >Your votes is important to us.</h4>
                                    <h4 className="text-white" >We will keep you update on the voting result. Wish you have a nice day!</h4>
                              </div>
                               <div className="col-lg-4 col-md-4 mx-auto col-4">
                               <button  type="button" onClick={onLogin} className="form-control" id="submit-button" name="submit">Sign in to vote</button>
                              </div>
                             
                         </div>

                    </div>
               </div>
     </section>
  );
}

export default Logout;
