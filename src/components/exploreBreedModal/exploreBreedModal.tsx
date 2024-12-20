import { useState, useEffect } from "react";
import { Modal, Image, Typography, Skeleton } from "antd";
import theCatAPI from "@api/catApiClient";
import { useLocation } from "wouter";
import type { Image as CatImage } from "@thatapicompany/thecatapi/dist/types";
import type { AvailableBreedsEnumType } from "@api/types";

const { Title } = Typography;

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
      .getImages({
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
      title={<Title level={2}>Explore Breed {breedId}</Title>}
      footer={null}
      onCancel={() => {
        setLocation("/");
      }}
      style={{ top: 20 }}
      width={800}
    >
      {isLoading ? (
        <Skeleton.Image active />
      ) : (
        catImages?.map((image: CatImage) => <Image src={image.url} />)
      )}
    </Modal>
  );
}
