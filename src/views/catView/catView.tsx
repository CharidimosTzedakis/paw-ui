import { useEffect, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
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

  const Cell = ({ columnIndex, rowIndex, style, data }) => {
    const { catImages, gap, columnCount } = data;
    const index = rowIndex * columnCount + columnIndex;
    if (index >= catImages.length) return null;
    const catImage = catImages[index];
    const newStyle = {
      ...style,
      left: style.left + gap * columnIndex, // Add gap to the left position
      top: style.top + gap * rowIndex, // Add gap to the top position
      width: style.width - gap, // Adjust width to account for the gap
      height: style.height - gap, // Adjust height to account for the gap
    };

    return (
      <div style={newStyle} className="grid-item">
        <CatCard key={catImage.id} id={catImage.id} imageUrl={catImage.url} />
      </div>
    );
  };

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
                {Cell}
              </Grid>
            );
          }}
        </AutoSizer>
      </div>

      {/*<div className={classes.catViewRow}>*/}
      {/*  {catImages.map((catImage) => (*/}
      {/*    <CatCard key={catImage.id} id={catImage.id} imageUrl={catImage.url} />*/}
      {/*  ))}*/}
      {/*  {isLoading*/}
      {/*    ? Array.from({ length: 10 }).map((_, index) => (*/}
      {/*        <Skeleton.Image*/}
      {/*          key={index}*/}
      {/*          active*/}
      {/*          className={classes.catImageSkeleton}*/}
      {/*        />*/}
      {/*      ))*/}
      {/*    : null}*/}
      {/*</div>*/}
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
