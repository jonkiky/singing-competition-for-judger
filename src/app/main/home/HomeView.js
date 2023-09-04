import React from 'react';
import { useForm } from "react-hook-form";
import { useLoginMutation } from "./loginMutation";
import { ToastContainer, toast } from 'react-toastify';

function HomeView(props) {
  
  if(props.warning) {
      toast.error("The username or password you entered does not match our records. Please try again or contact xiaolianbei.org@gmail.com for help")
      toast.clearWaitingQueue();
  }

 const [loginMutation, loginMutationResults] = useLoginMutation();

 const { handleSubmit, register } = useForm({ shouldUseNativeValidation: true });

 const disableForm = loginMutationResults.loading;

 const onSubmit = (values) => {
  // replace current parm in url
  window.history.replaceState({}, document.title, "./" );
  loginMutation(values.email, values.code);
 }

  return (
    <>
  	  <section className="hero d-flex flex-column justify-content-center align-items-center" id="home">
            <ToastContainer limit={1} />
            <div className="bg-overlay"></div>
               <div className="container">
                    <div className="row">
                         <div className="col-lg-8 col-md-10 mx-auto col-12">
                              <div className="hero-text mt-5 text-center">

                                    <h6 data-aos="fade-up"className="text-white"  data-aos-delay="300">Welcome to NAAAC-North America Alumni Alliance Cup Singing Competition Voting System</h6>
                                    <h1 className="text-white" data-aos="fade-up" data-aos-delay="500">NAAAC Judger portal</h1>
                              <form  onSubmit={handleSubmit(onSubmit)}>
                              <input type="text" className="form-control" name="cf-email" placeholder="User Name  (lowercase) "   {...register("email",{ required: "Please enter your email." })}  />
                              <input type="text" className="form-control" name="cf-group" placeholder="password"  {...register("code",{ required: "Please enter your password." })} />
                              <button disabled={disableForm} type="submit" className="form-control" id="submit-button" name="submit">Sign in </button>
                            </form>
                              </div>
                             
                         </div>

                    </div>
               </div>
              
     </section>
      <footer className="site-footer">
          <div className="container">
               <div className="row">
                    <div className="ml-auto col-lg-12 col-md-12">
                        <p className="copyright-text">
                          If you have any questions, please contact xiaolianbei.org@gmail.com.  Version : 1.0.2
                        </p>
                    </div>
                    <div className="ml-auto col-lg-12 col-md-12">
                        <p className="copyright-text">
                        Copyright &copy; 2022 North America Alumni Alliance Cup. Design By Y&L Solution <span role="img" aria-label="twist"> &#9994; </span>  Photos on Unsplash
                        </p>
                    </div>
               </div>
          </div>
     </footer>
     </>
  );
}

export default HomeView;
