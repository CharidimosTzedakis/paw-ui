import { useState } from "react";
import { useLocation } from "wouter";
import { Card, Button, Image, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import theCatAPI from "@api/catApiClient";
import classes from "./favouritesCatCard.module.scss";

const { confirm } = Modal;

export default function FavouritesCatCard({
  favouritesId,
  imageId,
  imageUrl,
  onFavouritesRemove,
}: {
  favouritesId: number;
  imageId: string;
  imageUrl: string;
  onFavouritesRemove: (favouritesId: number) => void;
}) {
  const [, setLocation] = useLocation();
  const [removeInFlight, setRemoveInFlight] = useState(false);

  const handleOnViewDetails = () => {
    setLocation(`../cats/${imageId}`);
  };

  const handleOnRemove = () => {
    setRemoveInFlight(true);
    theCatAPI.favourites
      .deleteFavourite(favouritesId)
      .then(() => {
        onFavouritesRemove(favouritesId);
      })
      .catch((error) => {
        console.log(error);
        setRemoveInFlight(false);
      });
  };

  const showConfirm = () => {
    confirm({
      title: "Are you sure you want to remove this image from your favourites?",
      // content: 'This action is irreversible. Please confirm your choice.',
      okText: "Yes",
      cancelText: "No",
      onOk() {
        handleOnRemove();
      },
      onCancel() {},
    });
  };

  return (
    <Card className={classes.favouritesCatCard} bordered>
      <Image src={imageUrl} className={classes.favouriteImage} />
      <div className={classes.actions}>
        <Button
          key="view_image_details"
          type="primary"
          onClick={handleOnViewDetails}
        >
          View details
        </Button>
        <Button
          key="remove_favourite_image"
          type="default"
          onClick={showConfirm}
          loading={removeInFlight}
          disabled={removeInFlight}
        >
          <DeleteOutlined />
          Remove
        </Button>
      </div>
    </Card>
  );
}
