import React from "react";
import Slider from "rc-slider";
import { BsFillStarFill, BsStar } from "react-icons/bs";
import { BannerAside } from "./BannerAside/BannerAside";


type AsideSectionType = {
  minMaxPrice: number | number[];
  setMaxPrice: (e: string) => void;
  setMinPrice: (e: string) => void;
  maxMinStartPrice: number[];
  setSortRangePriceMaxMin: (e: string[]) => void;
  setItemOffset: (e: number) => void;
  setMinMaxPrice: (e: number | number[]) => void;
  categoriesNameData: string[];
  nameFilterCategory: (string | null)[];
  setFilterCategoryName: (e: string) => void;
  ratingArr: number[];
  setFilterRate: (e: number) => void;
  filterRating: number[];
  isOpenFilter: boolean
  setIsOpenFilter: (e: boolean) => void
};

export const AsideSection: React.FC<AsideSectionType> = (props) => {
  const { minMaxPrice, setMaxPrice, setMinPrice, maxMinStartPrice } = props;
  const { setSortRangePriceMaxMin, setItemOffset, setMinMaxPrice } = props;
  const { categoriesNameData, nameFilterCategory, setFilterCategoryName } = props;
  const { ratingArr, setFilterRate, filterRating, isOpenFilter } = props;
  const {setIsOpenFilter} = props;
  return (
    <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">
      {/* filter min max ok form */}
      <div className={`offcanvas offcanvas-start offcanvas-collapse w-md-50 ${isOpenFilter ? 'show ' : 'show hiding'}` }>
        
      <div className="offcanvas-header d-lg-none" >
              <h5 className="offcanvas-title" id="offcanvasCategoryLabel">Filter</h5>
              <button  onClick={()=> setIsOpenFilter(!isOpenFilter)} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
        <div className="offcanvas-body ps-lg-2 pt-lg-0">

      <div className="row">
        <h5 className="mb-3">Price:</h5>
        <div className="col-4">
          <input
            type="text"
            value={Array.isArray(minMaxPrice) && minMaxPrice.length > 0
              ? minMaxPrice[0]
              : 0}
            disabled={Array.isArray(minMaxPrice) && minMaxPrice.length > 0
              ? false
              : true}
            className="form-control"
            onChange={(e) => setMinPrice(e.target.value)} />
        </div>
        <span className="col-4 align-self-center  text-center">
          —
        </span>
        <div className="col-4">
          <input
            type="text"
            value={Array.isArray(minMaxPrice) && minMaxPrice.length > 0
              ? minMaxPrice[1]
              : 0}
            disabled={Array.isArray(minMaxPrice) && minMaxPrice.length > 0
              ? false
              : true}
            className="form-control"
            onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <Slider
            range
            defaultValue={[maxMinStartPrice[0], maxMinStartPrice[1]]}
            className="t-slider mt-3"
            min={maxMinStartPrice[0]}
            max={maxMinStartPrice[1]}
            value={minMaxPrice}
            onAfterChange={(arr) => {
              if (arr !== undefined && Array.isArray(arr)) {
                setSortRangePriceMaxMin([
                  arr[0].toString(),
                  arr[1].toString(),
                ]);
              }
              //set page on 1
              setItemOffset(1);
            }}
            onChange={(arr) => {
              setMinMaxPrice(arr);
            }} />
        </div>
      </div>
      {/*    filter category */}
      <div className="mb-8">
        <h5>Category</h5>
        <div>
          {categoriesNameData.map((cat, i) => {
            return (
              <div key={i + cat} className="form-check">
                <input
                  id={cat}
                  className="form-check-input"
                  type="checkbox"
                  checked={nameFilterCategory.includes(cat)}
                  value={cat}
                  onChange={(e) => {
                    setFilterCategoryName(e.target.value);
                  }} />
                <label htmlFor={cat} className="form-check-label">
                  {cat[0].toUpperCase() + cat.slice(1)}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* filter rating  */}
      <div className="mb-8">
        <h5>Rating</h5>
        {ratingArr.map((r, i) => {
          return (
            <div
              className="d-flex align-content-center"
              key={r + "rating"}
            >
              <input
                className="form-check-input mb-2"
                onChange={(e) => {
                  setFilterRate(+e.target.value);
                }}
                type="checkbox"
                id={r + "stars"}
                value={r}
                checked={filterRating.includes(r)} />
              <label htmlFor={r + "stars"} className="ms-2">
                {r === 5 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 4 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 3 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 2 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 1 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : (
                  <BsStar className="me-1 " />
                )}
                {r === 5 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 4 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 3 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 2 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : (
                  <BsStar className="me-1 " />
                )}
                {r === 5 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 4 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 3 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : (
                  <BsStar className="me-1 " />
                )}
                {r === 5 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : r === 4 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : (
                  <BsStar className="me-1 " />
                )}
                {r === 5 ? (
                  <BsFillStarFill className="me-1 ratingYellow" />
                ) : (
                  <BsStar className="me-1 " />
                )}
              </label>
            </div>
          );
        })}
      </div>
      <BannerAside />
      </div>
      
      
      </div>  
    
     {isOpenFilter && 
   <div
      onClick={()=> setIsOpenFilter(!isOpenFilter)}
      className={`offcanvas-backdrop  ${isOpenFilter ? ' fade  show' : 'fade '} `} ></div> 
}
    </aside>
  );
};
