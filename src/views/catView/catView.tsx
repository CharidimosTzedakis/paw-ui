import { useEffect, useState } from "react";
import CatCard from "@components/catCard";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImageType } from "@api/types";
import classes from "./catView.module.scss";

const CatView = () => {
  const [catImages, setCatImages] = useState<CatImageType[]>([]);

  useEffect(() => {
    theCatAPI.images
      .searchImages({
        limit: 10,
      })
      .then((images) => {
        setCatImages(images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.catViewRow}>
      {catImages.map((catImage) => (
        <CatCard key={catImage.id} imageUrl={catImage.url} />
      ))}
    </div>
  );
};

export default CatView;
