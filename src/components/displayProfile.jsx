import ProfilePage from "./profile";
import { FriendProvider } from "../contexts/friendshipContext";
import { Users } from "../hooks/userHooks";




function DisplayProfile(){
const {paramUserId} = Users()

    return(
        <FriendProvider paramUserId={paramUserId}>
            <ProfilePage></ProfilePage>
        </FriendProvider>
    )
}

export default DisplayProfile