import { useEffect, useState } from "react";
import CatCard from "@components/catCard";
import { Button, Skeleton } from "antd";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImage } from "@api/types";
import classes from "./catView.module.scss";

const CatView = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = () => {
    setFetched(false);
  };

  useEffect(() => {
    if (fetched) {
      return;
    }

    setIsLoading(true);
    theCatAPI.images
      .searchImages({
        limit: 10,
      })
      .then((images) => {
        setCatImages([...catImages, ...images]);
        setFetched(true);
        setIsLoading(false);
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
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton.Image
                key={index}
                active
                className={classes.catImageSkeleton}
              />
            ))
          : null}
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
