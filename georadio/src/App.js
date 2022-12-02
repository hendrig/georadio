import { useState, useEffect } from "react";
import UserCard from "./components/user-card";
import UserList from "./components/user-list";
import useGetUsersInfo from "./hooks/useGetUsersInfo";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const PLAYLIST_ID = "7yBUhZvvCxKLk9jsYL9etb";

function App() {
  const [accessToken, setAccessToken] = useState("Bearer ");
  const [searchParams, setSearchParams] = useState({});
  const [myuserList, setUserList] = useState([]);
  const [userInfoState, setUserInfo] = useState([])
  const usersInfo = useGetUsersInfo();

  useEffect(() => {
    setUserInfo(usersInfo)
    search();
  }, []);

  async function search() {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };

    await fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken("Bearer " + data.access_token);
      });
    const token = await GetAuthToken();

    const currentSearchParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    setTimeout(setSearchParams(currentSearchParams), 10000);

    let songMap = [];

    await fetch(
      "https://api.spotify.com/v1/playlists/" + PLAYLIST_ID + "/tracks",
      currentSearchParams
    )
      .then((response) => response.json())
      .then((data) => {
        const songsArray = data.items.map((s) => s);
        songsArray.forEach((x) => {
          let user = x.added_by;
          let x2 = {
            user: {
              id: user.id,
              href: user.href,
            },
            track: x.track,
          };

          songMap.push(x2);
        });
      });

    const usersArray = songMap.map((x) => x);

    const usersList = usersArray.reduce((p, c) => {
      var user = c.user.href;

      if (!p.hasOwnProperty(user)) {
        p[user] = 0;
      }

      p[user]++;

      return p;
    });

    let userListArray = [];

    const userlistExtended = Object.keys(usersList).map((x) => {
      return { url: x, count: usersList[x] };
    });

    for (const i in userlistExtended) {
      const user = userlistExtended[i];

      try {
        const myuser = await getUserByUrl(user.url);
        const username = myuser.display_name;
        const img_url = myuser.images[0].url;
        let u = {
          key: i,
          userName: username,
          qtty: user.count,
          img_url: img_url,
        };

        if (u.userName.length > 2) {
          userListArray.push(u);
        }
      } catch (error) {}
    }

    await setUserList(userListArray);
  }

  const getUserByUrl = async (id) => {
    let user = "";

    try {
      await fetch(id, searchParams)
        .then((response) => response.json())
        .then((data) => (user = data));
    } catch (error) {}

    return user;
  };

  console.log("UsersInfo", userInfoState)
  return (!!userInfoState &&
    <>
      <h1>GeoRadio Police</h1>
      <UserList userList={myuserList}></UserList>
    </>
  );
}

const GetAuthToken = async () => {
  let token = "";
  const authParameters = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body:
      "grant_type=client_credentials&client_id=" +
      CLIENT_ID +
      "&client_secret=" +
      CLIENT_SECRET,
  };

  await fetch("https://accounts.spotify.com/api/token", authParameters)
    .then((result) => result.json())
    .then((data) => {
      //setAccessToken("Bearer " + data.access_token);
      token = "Bearer " + data.access_token;
    });
  return token;
};

export default App;
