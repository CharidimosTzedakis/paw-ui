import { useLocation } from "wouter";
import { Card, Skeleton, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

//  href={`../cats/${id}`

export default function FavouritesCatCard({
  id,
  imageUrl,
}: {
  id: string | undefined;
  imageUrl: string | undefined;
}) {
  return id ? (
    <Card
      bordered
      style={{
        width: "100%",
        height: 500,
        // backgroundImage: `url(${imageUrl})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
      actions={[
        <Button key="view" type="primary">
          View details
        </Button>,
        <Button key="delete" type="default">
          <DeleteOutlined />
          Remove
        </Button>,
      ]}
    >
      <Image src={imageUrl} />
    </Card>
  ) : (
    <Skeleton.Image active style={{ width: 284, height: 500 }} />
  );
}
