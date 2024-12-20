import { List, Typography } from "antd";
import { capitalize } from "lodash";
import { useLocation } from "wouter";
import { availableBreeds } from "@api/constants/availableBreeds";
import classes from "./breedView.module.scss";

const { Title } = Typography;

export default function BreedView() {
  const [, setLocation] = useLocation();

  const listItems = Object.keys(availableBreeds).map((key) => ({
    breedName: key,
    breedId: availableBreeds[key as keyof typeof availableBreeds],
  }));

  return (
    <div className={classes.breedViewContainer}>
      <List
        size="large"
        header={<Title level={2}>Cat Breeds</Title>}
        dataSource={listItems}
        renderItem={(item) => (
          <List.Item
            tabIndex={0}
            className={classes.listItem}
            onClick={(e) => {
              const breedId = e.currentTarget.getAttribute("data-breed-id");
              setLocation(`/${breedId}`);
            }}
            data-breed-id={item.breedId}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                console.log("Card selected via keyboard!");
              }
            }}
            role="button"
          >
            {capitalize(item.breedName.replace(/_/g, " "))}
          </List.Item>
        )}
      />
    </div>
  );
}
