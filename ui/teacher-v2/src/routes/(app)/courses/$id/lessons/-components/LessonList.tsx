import LessonCard from "./LessonCard";

type Props = {};

const LessonList = ({}: Props) => {
    return (
        <div>
            {new Array(2).fill(0).map((_, index) => (
                <LessonCard key={index}></LessonCard>
            ))}
        </div>
    );
};

export default LessonList;
