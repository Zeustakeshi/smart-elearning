import Button from "../ui/Button";

type Props = {};

const Profile = ({}: Props) => {
    return (
        <div className="flex gap-2 justify-end items-center">
            <Button variant="outline">Đăng ký</Button>
            <Button variant="primary">Đăng nhập</Button>
        </div>
    );
};

export default Profile;
