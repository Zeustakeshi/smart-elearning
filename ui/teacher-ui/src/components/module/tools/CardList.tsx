import Card from "./Card";
import { NameCard } from "@/types/tag";
const CardList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {NameCard.map((card) => (
        <Card
          iconleft={card.iconleft}
          title={card.title}
          subtitle={card.subtitle}
        />
      ))}
    </div>
  );
};

export default CardList;
