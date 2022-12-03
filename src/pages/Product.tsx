import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { NavBreadcrumb } from "../components";
import { dataProduct } from "../reducers/product-reducer/product-reducer";
import { getProductInformation } from "../reducers/product-reducer/product-selector";
import { AppDispatch } from "../reducers/redux-store";
import ImageGallery from "react-image-gallery";

import { StarsUnderCard } from "../components/Products/StarsUnderCard/StarsUnderCard";
import { ProductCount } from "../components/Product/ProductCount/ProductCount";
import { ProductButtons } from "../components/Product/ProductButtons/ProductButtons";
import { GetProductDataType } from "../api/product-api";

export const Product = React.memo(() => {
  const productNumber = useParams();
  const dispatch: AppDispatch = useDispatch();
  const productData = useSelector(getProductInformation);

  useEffect(() => {
    if (productNumber.id !== undefined) {
      const isSameId = productData.some(
        (m) => m.id === Number(productNumber.id)
      );
      if (!isSameId) {
        dispatch(dataProduct(+productNumber.id));
      }
    }
  }, []);



  return (
    <>
      <NavBreadcrumb />
      <section className="mt-8">
        <div className="container">
          {productData.length > 0 &&
            productData
              .filter((m) => {
                if (
                  m !== undefined &&
                  productNumber.id !== undefined &&
                  m.id === +productNumber.id
                ) {
                  return [m];
                } else {
                  return null;
                }
              })
              .map((m) => {
                return (
                  <div className="row" key={m.id}>
                    <div className="col-md-6">
                      <div className="image__product__width">
                        <ImageGallery
                          items={[
                            {
                              original: m.image,
                              thumbnail: m.image,
                              originalTitle: m.title,
                              originalAlt: m.title,
                              thumbnailWidth: 50,
                            },
                          ]}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="ps-lg-10 mt-6 mt-md-0">
                        <Link
                          className="mb-4 d-block"
                          to={`/products/category/${m.category.replace(
                            " ",
                            "-"
                          )}`}
                        >
                          {m.category[0].toUpperCase() + m.category.slice(1)}
                        </Link>
                        {/* h1 */}
                        <h1 className="mb-1"> {m.title}</h1>
                        <div className="mb-4">
                          <StarsUnderCard
                            rating={m.rating.rate}
                            countRating={m.rating.count}
                            type={"product"}
                          />
                        </div>
                        {/* price */}
                        <div className="fs-4">
                          <span className="text-dark">${m.price}</span>
                        </div>
                      </div>
                      <hr className="my-6" />
                      {/*  count */}
                      <ProductCount />
                      <ProductButtons />
                      <hr className="my-6" />
                      <TypeProduct product={productData} />
                      <ProductShare />
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
      <ProductDescription />
    </>
  );
});

export const ProductDescription = () => {
  const [activeTab, setActiveTab] = useState("Home");
  
  return (
    <section className="mt-lg-14 mt-8 ">
      <div className="container">
        <div className="row">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                onClick={(e) =>
                  setActiveTab(e.currentTarget.textContent as string)
                }
                className={`nav-link ${activeTab === "Home" ? "active" : ""}`}
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Home
              </button>
            </li>
            <li className={`nav-item  `} role="presentation">
              <button
                onClick={(e) =>
                  setActiveTab(e.currentTarget.textContent as string)
                }
                className={`nav-link ${
                  activeTab === "Information" ? "active" : ""
                }`}
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Information
              </button>
            </li>
            <li className="nav-item " role="presentation">
              <button
                onClick={(e) =>
                  setActiveTab(e.currentTarget.textContent as string)
                }
                className={`nav-link ${
                  activeTab === "Contact" ? "active" : ""
                }`}
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact"
                type="button"
                role="tab"
                aria-controls="contact"
                aria-selected="false"
              >
                Contact
              </button>
            </li>
          </ul>
          <div className="tab-content " id="myTabContent">
            <div
              className={`tab-pane  ${
                activeTab === "Home" ? "active show" : ""
              }`}
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div className="my-8">
                <div className="mb-5">
                  <h4 className="mb-1">Nutrient Value &amp; Benefits</h4>
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nisi, tellus iaculis urna bibendum in lacus, integer. Id
                    imperdiet vitae varius sed magnis eu nisi nunc sit. Vel,
                    varius habitant ornare ac rhoncus. Consequat risus facilisis
                    ante ipsum netus risus adipiscing sagittis sed. Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
                <div className="mb-5">
                  <h5 className="mb-1">Storage Tips</h5>
                  <p className="mb-0">
                    Nisi, tellus iaculis urna bibendum in lacus, integer. Id
                    imperdiet vitae varius sed magnis eu nisi nunc sit. Vel,
                    varius habitant ornare ac rhoncus. Consequat risus facilisis
                    ante ipsum netus risus adipiscing sagittis sed.Lorem ipsum
                    dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>

                <div className="mb-5">
                  <h5 className="mb-1">Unit</h5>
                  <p className="mb-0">3 units</p>
                </div>
                <div className="mb-5">
                  <h5 className="mb-1">Seller</h5>
                  <p className="mb-0">DMart Pvt. LTD</p>
                </div>
                <div>
                  <h5 className="mb-1">Disclaimer</h5>
                  <p className="mb-0">
                    Image shown is a representation and may slightly vary from
                    the actual product. Every effort is made to maintain
                    accuracy of all information displayed.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "Information" ? "active show" : ""
              }`}
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <div className="my-8">
                <div className="row">
                  <div className="col-12">
                    <h4 className="mb-4">Details</h4>
                  </div>
                  <div className="col-12 col-lg-6">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th>Weight</th>
                          <td>1000 Grams</td>
                        </tr>
                        <tr>
                          <th>Ingredient Type</th>
                          <td>Vegetarian</td>
                        </tr>
                        <tr>
                          <th>Brand</th>
                          <td>Dmart</td>
                        </tr>
                        <tr>
                          <th>Item Package Quantity</th>
                          <td>1</td>
                        </tr>
                        <tr>
                          <th>Form</th>
                          <td>Larry the Bird</td>
                        </tr>
                        <tr>
                          <th>Manufacturer</th>
                          <td>Dmart</td>
                        </tr>
                        <tr>
                          <th>Net Quantity</th>
                          <td>340.0 Gram</td>
                        </tr>
                        <tr>
                          <th>Product Dimensions</th>
                          <td>9.6 x 7.49 x 18.49 cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 col-lg-6">
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <th>ASIN</th>
                          <td>SB0025UJ75W</td>
                        </tr>
                        <tr>
                          <th>Best Sellers Rank</th>
                          <td>#2 in Fruits</td>
                        </tr>
                        <tr>
                          <th>Date First Available</th>
                          <td>30 April 2022</td>
                        </tr>
                        <tr>
                          <th>Item Weight</th>
                          <td>500g</td>
                        </tr>
                        <tr>
                          <th>Generic Name</th>
                          <td>Banana Robusta</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`tab-pane fade show ${
                activeTab === "Contact" ? "active show" : ""
              }`}
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
            >
              <div className="my-8">
              Nutrient Value & Benefits
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi, tellus iaculis urna bibendum in lacus, integer. Id imperdiet vitae varius sed magnis eu nisi nunc sit. Vel, varius habitant ornare ac rhoncus. Consequat risus facilisis ante ipsum netus risus adipiscing sagittis sed. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProductShare = () => {
  return (
    <div className="mt-8">
      <div className="dropdown">
        <a
          className="btn btn-outline-secondary dropdown-toggle"
          href="!#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Share
        </a>

        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="!#">
              <i className="bi bi-facebook me-2"></i>Facebook
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="!#">
              <i className="bi bi-twitter me-2"></i>Twitter
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="!#">
              <i className="bi bi-instagram me-2"></i>Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

type TypeProductType = {
  product: GetProductDataType[];
};
export const TypeProduct = ({ product }: TypeProductType) => {
  return (
    <>
      {product.map((m, i) => {
        return (
          <div key={i}>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td>Product Code:</td>
                  <td>{m.id}</td>
                </tr>
                <tr>
                  <td>Availability:</td>
                  <td>In Stock</td>
                </tr>
                <tr>
                  <td>Type:</td>
                  <td>{m.category}</td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td>
                    <small>
                      01 day shipping.
                      <span className="text-muted">( Free pickup today)</span>
                    </small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
};
