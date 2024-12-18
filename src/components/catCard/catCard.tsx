import { Card } from "antd";
import classes from "./catCard.module.scss";

export default function CatCard({ title }: { title: string }) {
  return (
    <Card title={title} bordered className={classes.catCard}>
      Content
    </Card>
  );
}
