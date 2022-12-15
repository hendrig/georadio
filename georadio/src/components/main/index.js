import { useAuthenticationContext } from "../../contexts/AuthenticationContext";
import GetPlaylist from "../../service/playlist-service";
import UserList from "../user-list";

const Main = () => {
  const { accessToken } = useAuthenticationContext();
  const test = [{ userName: "test", qtty: 1 }];

  let [list, next] = GetPlaylist({ playlistId: "7yBUhZvvCxKLk9jsYL9etb" });

  while (next !== undefined) {
    console.log("Next is: ", next);
    const [list2, next2] = GetPlaylist({
      playlistId: "7yBUhZvvCxKLk9jsYL9etb",
      nextCall: next,
    });
    next = next2;
  }

  return <UserList userList={test}></UserList>;
};

export default Main;
