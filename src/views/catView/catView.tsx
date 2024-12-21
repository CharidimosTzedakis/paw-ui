import { useEffect, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import CatViewGridCell from "./catViewGridCell";
import { Button } from "antd";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImage } from "@api/types";
import classes from "./catView.module.scss";

const CatView = () => {
  const [catImages, setCatImages] = useState<(CatImage | null)[]>(
    new Array(10).fill(null),
  );
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = () => {
    setFetched(false);
    setCatImages((prevCatImages) => [
      ...prevCatImages,
      ...new Array(10).fill(null),
    ]);
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
        setCatImages([
          ...catImages.filter((image) => Boolean(image)),
          ...images,
        ]);
        setFetched(true);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [catImages, fetched]);

  return (
    <div className={classes.catViewContainer}>
      <div className={classes.autoSizerContainer}>
        <AutoSizer>
          {({ height, width }) => {
            const columnCount = Math.floor(width / 300);
            const rowCount = Math.ceil(catImages.length / columnCount);
            const gap = 16;
            return (
              <Grid
                columnCount={columnCount}
                columnWidth={300}
                height={height}
                rowCount={rowCount}
                rowHeight={500}
                width={columnCount * 300 + columnCount * 16}
                itemData={{ catImages, gap, columnCount }}
              >
                {CatViewGridCell}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>

      <div className={classes.loadMoreButtonContainer}>
        <Button
          type="primary"
          className={classes.loadMoreButton}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default CatView;
