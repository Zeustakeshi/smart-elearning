import { useAuth } from "@/context/AuthContext";
import Button from "../ui/Button";
import Notification from "./Notification";
import Profile from "./Profile";

type Props = {};

const HeaderRight = (props: Props) => {
    const { user, isAuthenticated } = useAuth();
    return (
        <div className="flex gap-2 justify-end items-center">
            {!isAuthenticated && (
                <>
                    <Button to="/auth/register" variant="outline">
                        Đăng ký
                    </Button>
                    <Button to="/auth/login" variant="primary">
                        Đăng nhập
                    </Button>
                </>
            )}
            {isAuthenticated && (
                <>
                    <Notification></Notification>
                    <Profile></Profile>
                </>
            )}
        </div>
    );
};

export default HeaderRight;
