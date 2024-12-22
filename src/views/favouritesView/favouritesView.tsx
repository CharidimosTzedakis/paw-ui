import { useEffect, useState } from "react";
import { Skeleton, Typography } from "antd";
import theCatAPI from "@api/catApiClient";
import FavouritesCatCard from "@components/favouritesCatCard";
import type { Favourite as FavouriteImage } from "@api/types";
import classes from "./favouritesView.module.scss";

const { Title } = Typography;

export default function FavouritesView() {
  const [favouriteImages, setFavouriteImages] = useState<FavouriteImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    theCatAPI.favourites
      .getFavourites()
      .then((favouriteImages) => {
        console.log(favouriteImages);
        setFavouriteImages([...favouriteImages]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Title level={2} className={classes.favouriteCatViewTitle}>
        Favourite images
      </Title>
      <div className={classes.favouriteCatViewRow}>
        {favouriteImages.map((item) => (
          <FavouritesCatCard
            key={item.image.id}
            id={item.image.id}
            imageUrl={item.image.url}
          />
        ))}
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton.Image
                key={index}
                active
                style={{ width: 284, height: 500 }}
              />
            ))
          : null}
      </div>
    </>
  );
}

{
  /*<div>*/
}
{
  /*  <Title level={2}>Favourite images</Title>*/
}
{
  /*</div>*/
}
