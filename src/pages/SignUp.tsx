import React from "react";
import { SignUpForm } from "../components";

export const SignUp = React.memo(() => {
  return (
    <section className="min__vh__50 mb-5">
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div className="mb-2">
              <h1>Sign up</h1>
              <p>Please fill all your date.</p>
            </div>
          </div>
          <hr />
          <div className="row justify-content-center mb-5">
            <div className="col-6">
              <SignUpForm />
            </div>
          </div>
               <hr />
        </div>
      </div>
    </section>
  );
});
