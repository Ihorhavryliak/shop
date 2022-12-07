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
  email: string;
  password: string;
  repeat_password: string;
};
type DataType = {
  username?: string;
  phone?: string;
  email?: string;
  password?: string;
  repeat_password?: string;
};

type NewType = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
};
//
type OrderFormType = {};
export const SignUpForm = React.memo((props: OrderFormType) => {
  const dispatch: AppDispatch = useDispatch();

  const isLogIn = useSelector(getIsAuthSelector);
  const [isAddProductMessage, setIsAddProductMessage] = useState<
    boolean | null
  >();
  const [isSuccessOrder, setIsSuccessOrder] = useState<null | boolean>(null);
  // name
  const singInValidate = (values: FormDataType) => {
    const errors: DataType = {};
    if (values.username.length <= 0) {
      errors.username = "Please enter a name.";
    }
    //email
    if (values.email.length <= 0) {
      errors.email = "Please enter a email.";
    }
    if (!(values.email.length <= 0) && !values.email.includes("@")) {
      errors.email = "Field Email must have include @.";
    }
    if (
      values.email.includes("@") &&
      !values.email.slice(values.email.indexOf("@")).includes(".")
    ) {
      errors.email = "Field Email must have include '.'";
    }
    if (
      values.email.includes("@") &&
      values.email.slice(values.email.indexOf("@")).includes(".") &&
      !(values.email.slice(values.email.lastIndexOf(".")).length - 1 > 0)
    ) {
      errors.email = "Field Email must have include 'alphabet after @ .'";
    }
 
    //phone
    if (values.phone.length <= 0) {
      errors.phone = "Please enter a phone."
    }
    if (Number.isNaN(+values.phone)) {
      errors.phone = "No valid mobile phone. Should include only number or '+' and number";
    }
    // password
    if (values.password.length <= 0) {
      errors.password = "Please enter a password.";
    }

    //repeat password
    if (values.repeat_password.length <= 0) {
      errors.repeat_password = "Please enter a  password.";
    }

    if (
      !(values.repeat_password.length <= 0) &&
      !(values.password === values.repeat_password)
    ) {
      errors.repeat_password = "Please enter a the same password.";
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
    window.scrollTo(0, 0);
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

  const navigate = useNavigate();
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
            email: "",
            password: "",
            repeat_password: "",
          }}
          validate={singInValidate}
          onSubmit={submit}
        >
          {({ isSubmitting, errors, setFieldValue, values, touched }) => (
            <Form noValidate>
              <div className="mb-1">
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
                  placeholder="Name"
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
              {/*    email */}
              <div className="mb-1">
                <label className="form-label">Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`form-control ${
                    touched.email !== undefined
                      ? errors.email
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder="Email"
                />

                <div
                  className={`${
                    touched.email && errors.email
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.email && errors.email && errors.email}
                  {touched.email && errors.email === undefined && "Looks good!"}
                </div>
              </div>
              {/*  phone */}
              <div className="mb-1">
                <label className="form-label">Mobile Phone</label>
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
                  placeholder="Mobile Phone"
                />

                <div
                  className={`${
                    touched.phone && errors.phone
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.phone && errors.phone && errors.phone}
                  {touched.phone && errors.phone === undefined && "Looks good!"}
                </div>
              </div>

              {/*  password */}
              <div className="mb-1">
                <label className="form-label">Password</label>
                <Field
                  type="password"
                  name="password"
                  className={`form-control ${
                    touched.password !== undefined
                      ? errors.password
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder="Password"
                />

                <div
                  className={`${
                    touched.password && errors.password
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.password && errors.password && errors.password}
                  {touched.password &&
                    errors.password === undefined &&
                    "Looks good!"}
                </div>
              </div>

              {/* repeat  password */}
              <div className="mb-4">
                <label className="form-label">Repeat password</label>
                <Field
                  type="password"
                  name="repeat_password"
                  className={`form-control ${
                    touched.repeat_password !== undefined
                      ? errors.repeat_password
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder="Password"
                />

                <div
                  className={`${
                    touched.repeat_password && errors.repeat_password
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.repeat_password &&
                    errors.repeat_password &&
                    errors.repeat_password}
                  {touched.repeat_password &&
                    errors.repeat_password === undefined &&
                    "Looks good!"}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button
                  onClick={() => {
                    return goToMainPAge();
                  }}
                  className="btn btn-dark"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isSubmitting}
                >
                  Sign Up
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
                            <strong>Error</strong>! You not Sign up. Try again
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
              <strong>You have Successfully Sign up!</strong>
            </div>
          </div>
          <div className="mt-2 d-flex justify-content-end ">
            <button
              onClick={() => {
                return goToMainPAge();
              }}
              className="btn btn-dark"
            >
              Go to home page
            </button>
          </div>
        </>
      )}
    </>
  );
});
