import { useEffect, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { debounce } from "lodash";
import CatViewGridCell from "./catViewGridCell";
import { Button, Typography } from "antd";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImage } from "@api/types";
import classes from "./catView.module.scss";

const { Title } = Typography;

const CatView = () => {
  const [catImages, setCatImages] = useState<(CatImage | null)[]>(
    new Array(10).fill(null),
  );
  const [fetched, setFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resizeTrigger, setResizeTrigger] = useState(0);

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

  useEffect(() => {
    const handleResize = debounce(
      () => setResizeTrigger((prev) => prev + 1),
      100,
    );
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={classes.catViewContainer}>
      <div className={classes.titlesContainer}>
        <Title level={2} className={classes.breedInfoTitle}>
          Cats
        </Title>
        <Title level={3} className={classes.breedInfoTitle}>
          Explore cat images!
        </Title>
      </div>

      <div className={classes.autoSizerContainer}>
        <AutoSizer key={resizeTrigger}>
          {({ height, width }) => {
            const columnCount = Math.floor(width / 300);
            const rowCount = Math.ceil(catImages.length / columnCount);
            const leftGap = columnCount !== 1 ? 16 : 0;
            const topGap = 16;
            const widthAdjust = columnCount !== 1 ? columnCount * leftGap : 0;
            return (
              <Grid
                columnCount={columnCount}
                columnWidth={300}
                height={height}
                rowCount={rowCount}
                rowHeight={500}
                width={columnCount * 300 + widthAdjust}
                itemData={{ catImages, topGap, leftGap, columnCount }}
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
          tabIndex={0}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default CatView;
