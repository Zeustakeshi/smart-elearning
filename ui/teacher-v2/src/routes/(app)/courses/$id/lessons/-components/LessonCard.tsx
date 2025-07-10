import { Link } from "@tanstack/react-router";

type Props = {};

const LessonCard = ({}: Props) => {
    return (
        <Link to="/lessons/$id/documents" params={{ id: "1" }}>
            LessonCard
        </Link>
    );
};

export default LessonCard;
