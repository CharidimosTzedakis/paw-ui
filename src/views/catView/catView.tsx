import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import CatViewGrid from "./catViewGrid";
import { Button, Typography } from "antd";
import theCatAPI from "@api/catApiClient";
import type { Image } from "@api/types";
import classes from "./catView.module.scss";

const { Title } = Typography;

const CatView = () => {
  const [catImages, setCatImages] = useState<(Image | null)[]>(
    new Array(10).fill(null),
  );
  const [imageBatchId, setImageBatchId] = useState(() => uuidv4());

  const { data, isFetching } = useQuery({
    queryKey: ["catImages", imageBatchId],
    queryFn: () => theCatAPI.images.searchImages({ limit: 10 }),
    placeholderData: new Array(10).fill(null),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const handleLoadMore = () => {
    setImageBatchId(uuidv4());
  };

  useEffect(() => {
    if (data) {
      setCatImages((catImages) => [
        ...catImages.filter((image) => Boolean(image)),
        ...data,
      ]);
    }
  }, [data]);

  return (
    <div className={classes.catViewContainer}>
      <div className={classes.titlesContainer}>
        <Title level={2} className={classes.breedInfoTitle}>
          Cats
        </Title>
        <Title level={3} className={classes.breedInfoTitle}>
          Explore cat images!
        </Title>
      </div>
      <CatViewGrid catImages={catImages} />
      <div className={classes.loadMoreButtonContainer}>
        <Button
          type="primary"
          className={classes.loadMoreButton}
          onClick={handleLoadMore}
          disabled={isFetching}
          tabIndex={0}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default CatView;
