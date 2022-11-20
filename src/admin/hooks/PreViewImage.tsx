import React, { useState } from "react";

type PreViewImageType = {
  file: any;
};

export const PreViewImage: React.FC<PreViewImageType> = React.memo(
  ({ file }) => {
    const [preViewImage, setPreViewImage] = useState<string>("");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const resulton = reader.result as string;
      setPreViewImage(resulton);
    };
    return (
      <div>
        {preViewImage ? (
          <div className="mb-3">
            <div>
              <img
                src={preViewImage}
                alt="preViewImage"
                width={'10%'}
                height={'10%'}
              />
            </div>{" "}
          </div>
        ) : (
          "Loading"
        )}
      </div>
    );
  }
);
