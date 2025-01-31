import { useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer, { Size } from "react-virtualized-auto-sizer";
import CatViewGridCell from "@views/catView/catViewGridCell.tsx";
import { Image } from "@thatapicompany/thecatapi/dist/types";
import classes from "@views/catView/catView.module.scss";

export default function CatViewGrid({
  catImages,
}: {
  catImages: (Image | null)[];
}) {
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const { width, height } = containerSize;

  const onResize = ({ width, height }: Size) => {
    setContainerSize({ width, height });
  };

  const columnCount = Math.floor(width / 300);
  const rowCount = Math.ceil(catImages.length / columnCount);
  const leftGap = columnCount !== 1 ? 16 : 0;
  const topGap = 16;
  const widthAdjust = columnCount !== 1 ? columnCount * leftGap : 0;

  return (
    <div className={classes.autoSizerContainer}>
      <AutoSizer onResize={onResize}>
        {() => {
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
  );
}
