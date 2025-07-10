import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Avatar from "../ui/Avatar";

type Props = {};

const Profile = ({}: Props) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { user, logout } = useAuth();
    return (
        <div className="relative">
            <div onClick={() => setShowMenu((show) => !show)}>
                <Avatar src={user?.avatar}></Avatar>
            </div>
            {showMenu && (
                <div className="absolute top-[110%]" onClick={() => logout()}>
                    Đăng xuất
                </div>
            )}
        </div>
    );
};

export default Profile;
