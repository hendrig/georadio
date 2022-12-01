import { useState, useEffect } from "react";

import UserCard from "./UserCard";

const CLIENT_ID = "6fe84fc4611c481186e834ae57059ca3";

const CLIENT_SECRET = "6621c2b50c15421cbedf27ef8a2655bc";

const PLAYLIST_ID = "7yBUhZvvCxKLk9jsYL9etb";

function App() {
  const [accessToken, setAccessToken] = useState("Bearer ");

  const [searchParams, setSearchParams] = useState({});

  const [myuserList, setUserList] = useState([]);

  useEffect(() => {
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

    setTimeout(
      await fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((result) => result.json())

        .then((data) => {
          setAccessToken("Bearer " + data.access_token);
        }),

      1000
    );

    console.log("Access2: ", accessToken);

    const currentSearchParams = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",

        Authorization: accessToken,
      },
    };

    setTimeout(setSearchParams(currentSearchParams), 10000);

    let songMap = [];

    setTimeout(
      await fetch(
        "https://api.spotify.com/v1/playlists/" + PLAYLIST_ID + "/tracks",

        searchParams
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
        }),

      1000
    );

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
        const username = await getUserByUrl(user.url);

        let u = {
          key: i,

          userName: username,

          qtty: user.count,
        };

        if (u.userName.length > 2) {
          userListArray.push(u);
        }
      } catch (error) {}
    }

    console.log("TestevW: ", userListArray);

    setUserList(userListArray);
  }

  const getUserByUrl = async (id) => {
    let user = "";

    try {
      await fetch(id, searchParams)
        .then((response) => response.json())

        .then((data) => (user = data.display_name));
    } catch (error) {}

    return user;
  };

  return (
    <div>
      {myuserList.map((u) => (
        <UserCard key={u.key} userName={u.userName} qtty={u.qtty} />
      ))}
    </div>
  );
}

export default App;
