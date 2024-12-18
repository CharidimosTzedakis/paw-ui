import { Card } from "antd";

export default function CatCard({ title }: { title: string }) {
  return (
    <Card title={title} bordered style={{ width: "100%" }}>
      Content
    </Card>
  );
}
