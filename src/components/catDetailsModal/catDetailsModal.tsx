import { useState, useEffect } from "react";
import { Modal, Typography, Skeleton } from "antd";
import { useLocation } from "wouter";
import theCatAPI from "@api/catApiClient";
import type { Image as CatImage, Breed } from "@api/types";
import CatDetailsModalContent from "./catDetailsModalContent";
import classes from "./catDetailsModal.module.scss";

const { Title } = Typography;

export default function CatDetailsModal({ id }: { id: string }) {
  const [, setLocation] = useLocation();
  const [catImage, setCatImage] = useState<CatImage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    theCatAPI.images
      .getImage(id)
      .then((image) => {
        setCatImage(image);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const breeds = catImage?.breeds;

  return (
    <Modal
      title={<Title level={2}>Cat details</Title>}
      className={classes.catDetailsModal}
      open
      footer={null}
      onCancel={() => {
        setLocation("..");
      }}
      style={{ top: 20 }}
      width={800}
    >
      {isLoading ? (
        <>
          <Skeleton.Image active className={classes.imageSkeleton} />
          <Title level={3} className={classes.breedInfoTitle}>
            Breed information
          </Title>
          <Skeleton paragraph={{ rows: 4 }} />
        </>
      ) : (
        <CatDetailsModalContent
          url={catImage?.url}
          breeds={breeds as Breed[]}
        />
      )}
    </Modal>
  );
}
