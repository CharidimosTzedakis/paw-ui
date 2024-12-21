import type { CSSProperties } from "react";
import CatCard from "@components/catCard";
import type { Image as CatImage } from "@api/types";

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
  const newStyle = {
    ...style,
    left: (style.left as number) + leftGap * columnIndex,
    top: (style.top as number) + topGap * rowIndex,
    width: (style.width as number) - leftGap,
    height: (style.height as number) - topGap,
  };

  return (
    <div style={newStyle} className="grid-item">
      <CatCard key={catImage?.id} id={catImage?.id} imageUrl={catImage?.url} />
    </div>
  );
}
