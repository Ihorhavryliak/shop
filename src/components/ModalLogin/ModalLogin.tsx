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

import { AppDispatch } from "../../reducers/redux-store";

import "./ModalLogin.scss";

type FormDataType = {
  username: string;
  password: string;
};
type DataType = {
  username?: string;
  password?: string;
};

type NewType = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
};
//

export const ModalLogin = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const isLogIn = useSelector(getIsAuthSelector);
  const isBody = useSelector(getIsBodySelector);
  const [isAddProductMessage, setIsAddProductMessage] = useState<
    boolean | null
  >();

  //
  const singInValidate = (values: FormDataType) => {
    const errors: DataType = {};
    if (values.username.length <= 0) {
      errors.username = "Please enter a name.";
    }
    if (values.password.length <= 0) {
      errors.password = "Please enter a password.";
    }
    return errors;
  };
  //send
  const submit = (
    values: FormDataType,
    { setSubmitting, resetForm }: NewType
  ) => {
    dispatch(setAuth(values.username, values.password));
    setSubmitting(false);
  };

  // reset
  useEffect(() => {
    setIsAddProductMessage(isLogIn);
  }, [isLogIn]);

  if (isAddProductMessage !== null) {
    setTimeout(() => {
      setIsAddProductMessage(null);
      dispatch(closeInformMassage());
    }, 400);
  }

  const closeForm = () => {
    setIsAddProductMessage(false);
    dispatch(closeInformMassage());
  };

  //
  return (
    <>
      {isBody && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            username: "",
            password: "",
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
                  placeholder="Enter Name"
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
                  placeholder="Enter Password"
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

              <div>
                <button
                  type="submit"
                  className="btn btn-dark"
                  disabled={isSubmitting}
                >
                  Sing In
                </button>
              </div>

              <div className="modal-footer border-0 justify-content-center">
                Already have an account? <a href="#!">Sign up</a>
              </div>

              {/* <!-- Modal false --> */}
              {isAddProductMessage === false && (
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
      {!isBody && (
        <>
          <div
            className="alert alert-success alert-dismissible fade show d-flex align-items-center  mb-0"
            role="alert"
          >
            <BsCheckCircleFill width={60} className="bi flex-shrink-0 me-2" />
            <div>
              <strong>Success!</strong>
            </div>
          </div>
        </>
      )}
    </>
  );
});
