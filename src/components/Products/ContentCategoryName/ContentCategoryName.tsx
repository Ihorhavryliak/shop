import React from "react";
import './ContentCategoryName.scss'

type ContentCategoryNameType = { categoryName: string; };

export const ContentCategoryName = React.memo( ({ categoryName }: ContentCategoryNameType) => {
  return (
    <>
      {categoryName && (
        <div className="card mb-3 bg-light border-0 ">
        <div className="card-body p-9 content__category__name banner__border">
          <h2 className="mb-0 fs-1">{categoryName}</h2>
        </div>   </div>
      )}
    </>
  );
});
