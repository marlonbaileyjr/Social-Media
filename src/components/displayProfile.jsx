import ProfilePage from "./profile";
import { FriendProvider } from "../contexts/friendshipContext";
import { Users } from "../hooks/userHooks";
import { LikeProvider } from "../contexts/likeContext";
import { CommentProvider } from "../contexts/commentContext";




function DisplayProfile(){
const {paramUserId} = Users()

    return(
        <CommentProvider>
        <LikeProvider>
        <FriendProvider paramUserId={paramUserId}>
            <ProfilePage></ProfilePage>
        </FriendProvider>
        </LikeProvider>
        </CommentProvider>
    )
}

export default DisplayProfile