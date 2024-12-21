import { Card } from "antd";
import { Link } from "wouter";
import { Skeleton } from "antd";

export default function CatCard({
  id,
  imageUrl,
}: {
  id: string | undefined;
  imageUrl: string | undefined;
}) {
  return id ? (
    <Link href={`/${id}`}>
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
  ) : (
    <Skeleton.Image active style={{ width: 284, height: 500 }} />
  );
}
