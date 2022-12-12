import React from "react";
import { GetProductDataType } from "../../../api/product-api";

type TypeProductType = {
  product: GetProductDataType[];
};
export const ProductCharacteristics = React.memo(({ product }: TypeProductType) => {
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
});
