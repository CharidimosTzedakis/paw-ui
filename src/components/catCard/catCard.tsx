import { Card } from "antd";

export default function CatCard({ imageUrl }: { imageUrl: string }) {
  return (
    <Card
      bordered
      style={{
        width: "100%",
        height: 500,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      hoverable
    />
  );
}
