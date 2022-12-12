import { Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { BsCheckCircleFill, BsFillExclamationTriangleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getNameCategoryInformation } from "../../../reducers/category-reducer/category-selector";
import { AppDispatch } from "../../../reducers/redux-store";
import { PreViewImage } from "../../hooks/PreViewImage";
import { actions, addNewProductData } from "../../reducers/add-product-reducer";
import { getIsProductAdd } from "../../reducers/add-product-selector";
import './AddNewProduct.scss'

export type ErrorsType = {
  title?: string;
  description?: string;
  category?: string;
  price?: number | string;
};
const userSearchFormValidate = (values: FormType) => {
  const errors: ErrorsType = {};
  if (values.title.length <= 0) {
    errors.title = "Please enter a title.";
  }
  if (values.description.length <= 0) {
    errors.description = "Please enter a description.";
  }
  //category
  if (values.category.length <= 0) {
    errors.category = "Please select a category.";
  }
  //price

  if (values.price < 0) {
    errors.price = "Price can not be less 0.";
  }
  if (values.price === 0) {
    errors.price = "Price can not be  0.";
  }
  return errors;
};

export type NewType = {
  setSubmitting: (isSubmitting: boolean) => void;
  resetForm: () => void;
};

export const AddNewProducts = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const getCategory = useSelector(getNameCategoryInformation);
  const fileRef = useRef<HTMLInputElement>(null);
  const isAddProduct = useSelector(getIsProductAdd);
  const [isAddProductMessage, setIsAddProductMessage] = useState< boolean | null>();
  useEffect(() => {
    setIsAddProductMessage(isAddProduct);
  }, [isAddProduct]);


  if(isAddProductMessage !== null) {
    setTimeout(()=>{
      setIsAddProductMessage(null);
      dispatch(actions.isProductAdd(null));
    },
    3000)
  };

  const closeForm = () => {
    setIsAddProductMessage(false);
    dispatch(actions.isProductAdd(null));
  };



  //photo
  const handleOpenFileInput = () => {
    fileRef.current?.click();
  };
  const resetFileInput = () => {
    if (fileRef.current !== null) {
      fileRef.current.value = "";
    }
  };
  //validation
  const submit = (values: FormType, { setSubmitting, resetForm }: NewType) => {
    dispatch(
      addNewProductData(
        values.title,
        +values.price,
        values.description,
        values.image.name,
        values.category
      )
    );
    resetFileInput();
    resetForm();
    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        title: "",
        price: "",
        description: "",
        image: { name: "", size: 0, type: "", webkitRelativePath: "" },
        category: "",
      }}
      validate={userSearchFormValidate}
      onSubmit={submit}
    >
      {({ isSubmitting, errors, setFieldValue, values, touched }) => (
        <Form className={`container`} noValidate>
          <div className="row">
            <div className="mb-3 mt-3">
              <>
                <label className="form-label">Title</label>
                {console.log("dfgfdg", touched.title)}
                <Field
                  type="text"
                  name="title"
                  className={`form-control ${
                    touched.title !== undefined
                      ? errors.title
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  placeholder="Title"
                />

                <div
                  className={`${
                    touched.title && errors.title
                      ? "invalid-feedback"
                      : "valid-feedback"
                  }`}
                >
                  {touched.title && errors.title && errors.title}
                  {touched.title && errors.title === undefined && "Looks good!"}
                </div>
              </>
            </div>

            <div className="mb-3 ">
              <label className="form-label">Description</label>
              <Field
                as="textarea"
                name="description"
                className={`form-control ${
                  touched.description !== undefined
                    ? errors.description
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
                placeholder="Description"
              />
              {/* error block */}
              <div
                className={`${
                  touched.description && errors.description
                    ? "invalid-feedback"
                    : "valid-feedback"
                }`}
              >
                {touched.description &&
                  errors.description &&
                  errors.description}
                {touched.description &&
                  errors.description === undefined &&
                  "Looks good!"}
              </div>
              {/* error block */}
            </div>
            <hr />
            {/* input category */}
            <div className="input-group mb-3 w-50">
              <Field
                name="category"
                component="select"
                className={`form-control  ${
                  touched.category !== undefined
                    ? errors.category
                      ? "is-invalid"
                      : "is-valid"
                    : ""
                }`}
              >
                <option key={"234s"} value="">
                  All
                </option>
                {getCategory.length > 0 &&
                  getCategory.map((m, i) => {
                    return (
                      <option key={m + i.toString()} value={m}>
                        {m[0].toLocaleUpperCase() + m.slice(1)}
                      </option>
                    );
                  })}
              </Field>
              <label className="input-group-text rounded-end">Category</label>
              {/*  error category */}
              <div
                className={`${
                  touched.category && errors.category
                    ? "invalid-feedback"
                    : "valid-feedback"
                }`}
              >
                {touched.category && errors.category && errors.category}
                {touched.category &&
                  errors.category === undefined &&
                  "Looks good!"}
              </div>
            </div>
            {/*  Price input  */}
            <div>
              <div className="input-group mb-3 w-25">
                <span className="input-group-text"></span>
                <Field
                  className={`form-control ${
                    touched.price !== undefined
                      ? errors.price
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                  type="number"
                  name="price"
                  placeholder="Price"
                />
                <span className="input-group-text">$</span>
             {/* error block */}
             <div
                className={`${
                  touched.price && errors.price
                    ? "invalid-feedback"
                    : "valid-feedback"
                }`}
              >
                {touched.price &&
                  errors.price &&
                  errors.price}
                {touched.price &&
                  errors.price === undefined &&
                  "Looks good!"}
              </div>
              {/* error block */}
              </div>
               
            </div>

            {values.image.name.length > 0 && (
              <PreViewImage file={values.image} />
            )}

            <div className="input-group mb-3 w-25">
              <input
                ref={fileRef}
                accept="image/png, image/jpeg"
                type="file"
                name="image"
                className="form-control"
                onChange={(e) => {
                  if (e.target.files instanceof FileList) {
                    setFieldValue("image", e.target.files[0]);
                  }
                }}
              />
              <label
                onClick={handleOpenFileInput}
                htmlFor="fileRef"
                className="input-group-text"
              ></label>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-dark"
                disabled={isSubmitting}
              >
                Add product
              </button>
            </div>
          </div>

          {/* <!-- Modal Successful --> */}
          {isAddProductMessage === true && (
            <>
              <div
                className={`modal fade   ${isAddProductMessage ? "show" : ""} `}
                style={{ display: `${isAddProductMessage ? "block" : ""}` }}
              >
                <div className="modal-dialog ">
                  <div className="modal-content">
                    <div
                      className="alert alert-success alert-dismissible fade show d-flex align-items-center  mb-0"
                      role="alert"
                    >
                      <BsCheckCircleFill
                        width={60}
                        className="bi flex-shrink-0 me-2"
                      />
                      <div>
                        <strong>Success!</strong> Product added.
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
          {/* <!-- Modal false --> */}
          {isAddProductMessage === false && (
            <>
              <div
                className={`modal fade   ${isAddProductMessage ? "" : "show"} `}
                style={{ display: `${isAddProductMessage ? "" : "block" }` }}
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
                        <strong>Error</strong>! Product not added. Try again!
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
  );
});

//type ---

type FormType = {
  title: string;
  price: number | string;
  description: string;
  image: {
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
  };
  category: string;
};
