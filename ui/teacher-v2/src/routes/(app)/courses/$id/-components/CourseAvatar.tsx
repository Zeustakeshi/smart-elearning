type Props = {
    url: string;
};

const CourseAvatar = ({ url }: Props) => {
    return (
        <div className="size-[120px] rounded-xl overflow-hidden">
            <img className="size-full object-cover" src={url} alt="" />
        </div>
    );
};

export default CourseAvatar;
