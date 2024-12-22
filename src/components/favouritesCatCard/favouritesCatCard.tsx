import { useLocation } from "wouter";
import { Card, Skeleton, Button, Image } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import classes from "./favouritesCatCard.module.scss";

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
      className={classes.favouritesCatCard}
      bordered
      style={{
        width: "100%",
        // height: 500,
        // backgroundImage: `url(${imageUrl})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      <Image src={imageUrl} className={classes.favouriteImage} />
      <div className={classes.actions}>
        <Button key="view" type="primary">
          View details
        </Button>
        <Button key="delete" type="default">
          <DeleteOutlined />
          Remove
        </Button>
      </div>
    </Card>
  ) : (
    <Skeleton.Image active style={{ width: "100%", height: 500 }} />
  );
}
