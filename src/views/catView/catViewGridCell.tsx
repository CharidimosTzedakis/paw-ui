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
  data: { gap: number; columnCount: number; catImages: (CatImage | null)[] };
}) {
  const { catImages, gap, columnCount } = data;
  const index = rowIndex * columnCount + columnIndex;
  if (index >= catImages.length) return null;
  const catImage = catImages[index];
  const newStyle = {
    ...style,
    left: (style.left as number) + gap * columnIndex,
    top: (style.top as number) + gap * rowIndex,
    width: (style.width as number) - gap,
    height: (style.height as number) - gap,
  };

  return (
    <div style={newStyle} className="grid-item">
      <CatCard key={catImage?.id} id={catImage?.id} imageUrl={catImage?.url} />
    </div>
  );
}
