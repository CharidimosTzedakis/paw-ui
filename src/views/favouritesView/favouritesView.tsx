import { useEffect, useState } from "react";
import { Skeleton, Typography } from "antd";
import theCatAPI from "@api/catApiClient";
import FavouritesCatCard from "@components/favouritesCatCard";
import type { Favourite as FavouriteImage } from "@api/types";
import classes from "./favouritesView.module.scss";

const { Title } = Typography;

export default function FavouritesView() {
  const [favouriteEntries, setFavouriteEntries] = useState<FavouriteImage[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const onFavouritesRemove = (favouriteId: number) => {
    setFavouriteEntries(
      favouriteEntries.filter((entry) => entry.id !== favouriteId),
    );
  };

  useEffect(() => {
    setIsLoading(true);
    theCatAPI.favourites
      .getFavourites()
      .then((favouriteImages) => {
        console.log(favouriteImages);
        setFavouriteEntries([...favouriteImages]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={classes.favouriteCatViewContainer}>
      <Title level={2} className={classes.favouriteCatViewTitle}>
        Favourite images
      </Title>
      <div className={classes.favouriteCatViewRow}>
        {favouriteEntries.map((item) => (
          <FavouritesCatCard
            key={item.image.id}
            favouritesId={item.id}
            imageId={item.image.id}
            imageUrl={item.image.url}
            onFavouritesRemove={onFavouritesRemove}
          />
        ))}
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton.Image
                key={index}
                active
                style={{ width: 366, height: 536 }}
              />
            ))
          : null}
      </div>
    </div>
  );
}
