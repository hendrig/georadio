import { useState } from "react";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

const GetPlaylist = ({ playlistId, nextCall = undefined }) => {
  const { accessToken } = useAuthenticationContext();
  const [next, setNext] = useState(undefined);

  const currentSearchParams = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
  };

  let songMap = [];

  const address =
    nextCall === undefined
      ? "https://api.spotify.com/v1/playlists/" +
        playlistId +
        "/tracks?offset=0&limit=100"
      : nextCall;

  console.log("Calling address ", address);
  console.log("Access Token ", accessToken);

  async function fetchList(fetchAddress, searchParams) {
    await fetch(fetchAddress, searchParams)
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

        console.log("0", data);
        setNext(data.next);
      });
  }

  fetchList(address, currentSearchParams);
  console.log("NEXT IS ", next);
  return [songMap, next];
};

export default GetPlaylist;
