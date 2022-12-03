import React, { useState } from "react";
import "./ProductCount.scss";

export const ProductCount = React.memo(() => {
  const [value, setValue] = useState(1);

  return (
    <div className="mb-3">
      <div className="input-group input-spinner  ">
        <input
        
          onClick={() => setValue(value - 1)}
          type="button"
          value="-"
          disabled={value === 0 && true}
          
          className="button-minus  btn  btn-sm "
      
          data-field="quantity"
        />
        <input
          className="quantity-field form-control-sm form-input   "
          type="number"
          value={value}
          onChange={(e) => {
            setValue(+e.target.value);
          }}
        />
        <input
          onClick={() => setValue(value + 1)}
          type="button"
          value="+"
          className="button-plus btn btn-sm "
          data-field="quantity"
        />
      </div>
    </div>
  );
});
