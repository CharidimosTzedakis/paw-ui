import { useState, useEffect } from "react";
import { Modal, Image, Typography, Skeleton } from "antd";
import theCatAPI from "@api/catApiClient";
import { useLocation } from "wouter";
import type { Image as CatImage } from "@thatapicompany/thecatapi/dist/types";
import type { AvailableBreedsEnumType } from "@api/types";
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
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [breedId]);

  return (
    <Modal
      open
      title={
        <>
          <Title level={2} className={classes.exploreBreedModalTitle}>
            Explore Breed {breedId}
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
              <Skeleton.Image key={index} active />
            ))
          : catImages?.map((image: CatImage) => (
              <Image key={image.url} src={image.url} preview={false} />
            ))}
      </div>
    </Modal>
  );
}
