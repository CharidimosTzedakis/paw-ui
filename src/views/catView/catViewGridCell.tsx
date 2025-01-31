import CatCard from "@components/catCard";
import type { CSSProperties } from "react";
import type { Image as CatImage } from "@api/types";

const isNumber = (value: unknown): value is number =>
  typeof value === "number" && !isNaN(value);

export default function CatViewGridCell({
  columnIndex,
  rowIndex,
  style,
  data,
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: {
    topGap: number;
    leftGap: number;
    columnCount: number;
    catImages: (CatImage | null)[];
  };
}) {
  const { catImages, topGap, leftGap, columnCount } = data;
  const index = rowIndex * columnCount + columnIndex;
  if (index >= catImages.length) return null;
  const catImage = catImages[index];

  const newStyle =
    isNumber(style.left) &&
    isNumber(style.top) &&
    isNumber(style.width) &&
    isNumber(style.height)
      ? {
          ...style,
          left: style.left + leftGap * columnIndex,
          top: style.top + topGap * rowIndex,
          width: style.width - leftGap,
          height: style.height - topGap,
        }
      : style;

  return (
    <div style={newStyle} className="grid-item">
      <CatCard key={catImage?.id} id={catImage?.id} imageUrl={catImage?.url} />
    </div>
  );
}
