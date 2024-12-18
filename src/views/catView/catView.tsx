import { useEffect, useState } from "react";
import CatCard from "@components/catCard";
import { Button } from "antd";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImageType } from "@api/types";
import classes from "./catView.module.scss";

const CatView = () => {
  const [catImages, setCatImages] = useState<CatImageType[]>([]);
  const [fetched, setFetched] = useState(false);

  const handleLoadMore = () => {
    setFetched(false);
  };

  useEffect(() => {
    if (fetched) {
      return;
    }

    theCatAPI.images
      .searchImages({
        limit: 10,
      })
      .then((images) => {
        setCatImages([...catImages, ...images]);
        setFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [catImages, fetched]);

  return (
    <div>
      <div className={classes.catViewRow}>
        {catImages.map((catImage) => (
          <CatCard key={catImage.id} id={catImage.id} imageUrl={catImage.url} />
        ))}
      </div>
      <div className={classes.loadMoreButtonContainer}>
        <Button
          type="primary"
          className={classes.loadMoreButton}
          onClick={handleLoadMore}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default CatView;
