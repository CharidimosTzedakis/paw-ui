import { useState } from "react";
import { Button } from "antd";
import theCatAPI from "@api/catApiClient";

export default function FavoriteButton({ catImageId }: { catImageId: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    if (success) {
      return;
    }

    setLoading(true);
    theCatAPI.favourites
      .addFavourite(catImageId)
      .then((resp) => {
        setSuccess(true);
        setLoading(false);
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Button
      type={success ? "primary" : "default"}
      loading={loading}
      disabled={loading}
      onClick={handleClick}
      style={success ? { backgroundColor: "#81c784" } : {}}
    >
      {success ? "Done!" : "Add to Favorites"}
    </Button>
  );
}
