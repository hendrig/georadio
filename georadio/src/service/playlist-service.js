import { useState } from "react";
import { useAuthenticationContext } from "../contexts/AuthenticationContext";

const GetPlaylist = ({
  playlistId,
  nextCall = undefined,
  previousList = [],
}) => {
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

  if (previousList.length > 0) {
    console.log("Previous list", previousList);
    songMap.concat(previousList);
  }
  const address =
    nextCall === undefined
      ? "https://api.spotify.com/v1/playlists/" +
        playlistId +
        "/tracks?offset=0&limit=100"
      : nextCall;

  async function fetchList(fetchAddress, searchParams) {
    console.log("previous> ", previousList.length);
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
        if (previousList.length > 0) {
          console.log("PUshing");
          previousList.forEach((x) => songMap.push(x));
        }
        setNext(data.next);
      });
  }

  fetchList(address, currentSearchParams);
  return [songMap, next];
};

export default GetPlaylist;
