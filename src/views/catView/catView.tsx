import CatCard from "@components/catCard";
import classes from "./catView.module.scss";

const CatView = () => {
  const cardList = Array.from({ length: 10 }, (_, index) => (
    <CatCard key={index} title={`Card ${index + 1}`} />
  ));

  return <div className={classes.catViewRow}>{cardList}</div>;
};

export default CatView;
