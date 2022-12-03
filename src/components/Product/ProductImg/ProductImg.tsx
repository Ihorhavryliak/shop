import React, { useRef, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import ImageGallery from "react-image-gallery";
import { GetProductDataType } from "../../../api/product-api";
import "./ProductImg.scss";

export const ProductImg = React.memo(({ m }: { m: GetProductDataType }) => {
  const [isOpenScreen, setIsOpenScreen] = useState(false);
  const screenRef = useRef<ReactImageGallery | null>(null);
  const onScreen = (e: boolean) => {
    setIsOpenScreen(e);
    screenRef?.current?.fullScreen();
  };
  return (
    <div className="col-md-6">
      <div className="image__product__width">
        <ImageGallery
          additionalClass={'product__main__photo'}
        
          items={[
            {
              original: m.image,
              thumbnail: m.image,
              fullscreen: m.image,
              originalTitle: m.title,
              originalAlt: m.title,
            },
            {
              original: m.image,
              thumbnail: m.image,

              originalTitle: m.title,
              originalAlt: m.title,
            },
          ]}
          slideDuration={200}
          showFullscreenButton={false}
          useBrowserFullscreen={false}
          renderCustomControls={() =>{
          return( <button
              onClick={() => onScreen(!isOpenScreen)}
              type="button"
              className="image-gallery-icon image-gallery-fullscreen-button"
              aria-label="Open Fullscreen"
            >
              <svg
                className="image-gallery-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
            </button>
          )}}
        />
  <div className={isOpenScreen ? 'not__visible visibility' : 'not__visible' }>
          <ImageGallery
            ref={screenRef}
            items={[
              {
                original: m.image,
                thumbnail: m.image,
                fullscreen: m.image,
                originalTitle: m.title,
                originalAlt: m.title,
              },
              {
                original: m.image,
                thumbnail: m.image,

                originalTitle: m.title,
                originalAlt: m.title,
              },
            ]}
            additionalClass={'product__screen_photo'}
            slideDuration={200}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            renderCustomControls={() => (
              <button
                onClick={() => setIsOpenScreen(false)}
                type="button"
                className="image-gallery-icon image-gallery-fullscreen-button"
                aria-label="Open Fullscreen"
              >
                <svg
                  className="image-gallery-svg"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </button>
            )}
          />
</div>
   {/*      <button onClick={()=>onScreen(!isOpenScreen)}>hoo</button> */}
      </div>
    </div>
  );
});
