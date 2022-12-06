import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
  BsCheckCircleFill,
  BsFillExclamationTriangleFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  closeInformMassage,
  setAuth,
} from "../../reducers/auth-reducer/auth-reducer";
import {
  getIsAuthSelector,
  getIsBodySelector,
} from "../../reducers/auth-reducer/auth-selector";
import { cleanCart } from "../../reducers/cart-reducer/cart-reducer";
import { AppDispatch } from "../../reducers/redux-store";


type FormDataType = {
  username: string;
  phone: string;
};
type DataType = {
  username?: string;
  phone?: string;
};

type NewType = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
  
};
//
type OrderFormType={

 
}
export const CheckoutForm = React.memo((props: OrderFormType) => {


  const dispatch: AppDispatch = useDispatch();

  const isLogIn = useSelector(getIsAuthSelector);
  const [isAddProductMessage, setIsAddProductMessage] = useState<boolean | null
  >();
  const [isSuccessOrder, setIsSuccessOrder] = useState<null| boolean>(null)
  //
  const singInValidate = (values: FormDataType) => {
    const errors: DataType = {};
    if (values.username.length <= 0) {
      errors.username = "Please enter a name.";
    }
    if (values.phone.length <= 0) {
      errors.phone = "Please enter a phone.";
    }
    return errors;
  };
  //send
  const submit = (
    values: FormDataType,
    { setSubmitting, resetForm }: NewType
  ) => {
     onClearCart();
    setIsSuccessOrder(true);
    setSubmitting(false);
  };

  // reset
  useEffect(() => {
    setIsAddProductMessage(isLogIn);
  }, [isLogIn]);

  if (isAddProductMessage !== null) {
    setTimeout(() => {
      setIsAddProductMessage(null);
    }, 400);
  }

  const closeForm = () => {
    setIsAddProductMessage(false);
  };
  const onClearCart = () => {
    dispatch(cleanCart());
  };

  const navigate =useNavigate()
  const goToMainPAge = () => {
    return navigate("/");
  };
  //
  return (
    <>
      {isSuccessOrder === null && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            username: "",
            phone: "",
          }}
          validate={singInValidate}
          onSubmit={submit}
        >
          {({ isSubmitting, errors, setFieldValue, values, touched }) => (
            <Form noValidate>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <Field
                  type="text"
                  name="username"
                  className={`form-control ${
                    touched.username !== undefined
                      ? errors.username
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder=""
                />

                <div
                  className={`${
                    touched.username && errors.username
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.username && errors.username && errors.username}
                  {touched.username &&
                    errors.username === undefined &&
                    "Looks good!"}
                </div>
              </div>

              {/*  password */}
              <div className="mb-4">
                <label className="form-label">Phone</label>
                <Field
                  type="phone"
                  name="phone"
                  className={`form-control ${
                    touched.phone !== undefined
                      ? errors.phone
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder=""
                />

                <div
                  className={`${
                    touched.phone && errors.phone
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.phone && errors.phone && errors.phone}
                  {touched.phone &&
                    errors.phone === undefined &&
                    "Looks good!"}
                </div>
              </div>

              <div className="d-flex justify-content-between">
     
      <button
          onClick={()=>{
           return (
            goToMainPAge()
            ) 
            }}
          className="btn btn-dark">
                Cancel
              </button> 
              <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isSubmitting}
                >
               Checkout
                </button>
              </div>

           

              {/* <!-- Modal false --> */}
              {isSuccessOrder === false && (
                <>
                  <div
                    className={`modal fade   ${
                      isAddProductMessage ? "" : "show"
                    } `}
                    style={{ display: `${isAddProductMessage ? "" : "block"}` }}
                  >
                    <div className="modal-dialog ">
                      <div className="modal-content">
                        <div
                          className="alert alert-danger alert-dismissible fade show d-flex align-items-center  mb-0"
                          role="alert"
                        >
                          <BsFillExclamationTriangleFill
                            width={60}
                            className="bi flex-shrink-0 me-2 mb-0"
                          />
                          <div>
                            <strong>Error</strong>! You not Sign In. Try again
                            please!
                          </div>
                          <button
                            type="button"
                            onClick={() => closeForm()}
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          ></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      )}
      {/* <!-- Modal Successful --> */}
      {isSuccessOrder === true && (
        <>
          <div
            className="alert alert-success alert-dismissible fade show d-flex align-items-center  mb-0"
            role="alert"
          >
            <BsCheckCircleFill width={60} className="bi flex-shrink-0 me-2" />
            <div>
              <strong>You have Successfully arranged order!</strong>
             
            </div>
            
          </div>
          <div className="mt-2 d-flex justify-content-end ">
          <button
          onClick={()=>{
        return (
          goToMainPAge()
        )
        }}
          className="btn btn-dark">
                Go to home page
              </button>

          </div>
        
        </>
      )}
 
    </>
  );
});
