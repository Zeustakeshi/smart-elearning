import AppContainer from "../container/AppContainer";
import Logo from "../ui/Logo";
import GlobalSearch from "./GlobalSearch";
import Profile from "./Profile";

type Props = {};

const Header = ({}: Props) => {
    return (
        <div className="border-b border-b-foreground sticky top-0 z-50 bg-white/99 backdrop:blur-lg">
            <AppContainer className="px-2 py-3 flex">
                <div className="flex justify-start items-center gap-2">
                    <Logo></Logo>
                </div>
                <div className="flex flex-1 justify-center items-center gap-2">
                    <GlobalSearch></GlobalSearch>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <Profile></Profile>
                </div>
            </AppContainer>
        </div>
    );
};

export default Header;
