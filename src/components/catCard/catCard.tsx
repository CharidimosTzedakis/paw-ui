import { Card } from "antd";
import { Link } from "wouter";

export default function CatCard({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) {
  return (
    <Link href={`/cats/${id}`}>
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
    </Link>
  );
}
