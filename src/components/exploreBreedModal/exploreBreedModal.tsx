import { useState, useEffect } from "react";
import { Modal, Image, Typography, Skeleton } from "antd";
import theCatAPI from "@api/catApiClient";
import { Link, useLocation } from "wouter";
import { capitalize } from "lodash";
import type { Image as CatImage } from "@thatapicompany/thecatapi/dist/types";
import type { AvailableBreedsEnumType } from "@api/types";
import { availableBreeds } from "@api/constants/availableBreeds";
import classes from "./exploreBreedModal.module.scss";

const { Title, Text } = Typography;

export default function ExploreBreedModal({
  breedId,
}: {
  breedId: AvailableBreedsEnumType;
}) {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    theCatAPI.images
      .searchImages({
        limit: 10,
        breeds: [breedId],
      })
      .then((images) => {
        setCatImages(images);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [breedId]);

  return (
    <Modal
      open
      title={
        <>
          <Title level={2} className={classes.exploreBreedModalTitle}>
            Explore Breed&nbsp;
            {capitalize(
              Object.keys(availableBreeds).find(
                (key) =>
                  availableBreeds[key as keyof typeof availableBreeds] ===
                  breedId,
              ),
            ).replace(/_/g, " ")}
          </Title>
          <Text>
            The following cats are from the breed. Click on them for more info!
          </Text>
        </>
      }
      footer={null}
      onCancel={() => {
        setLocation("/");
      }}
      style={{ top: 20 }}
      width={800}
    >
      <div className={classes.exploreBreedModalContent}>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton.Image
                key={index}
                active
                className={classes.exploreBreedModalSkeleton}
              />
            ))
          : catImages?.map((image: CatImage) => (
              <Link to={`../../cats/${image.id}`}>
                <Image key={image.url} src={image.url} preview={false} />
              </Link>
            ))}
      </div>
    </Modal>
  );
}
