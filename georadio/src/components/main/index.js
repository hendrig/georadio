import { useEffect, useState } from "react";
import GetPlaylist from "../../service/playlist-service";
import UserList from "../user-list";

const Main = () => {
  const test = [{ userName: "test", qtty: 1 }];

  //   useEffect(() => {
  //     GetMyPlaylist();
  //   }, []);

  const [list, next] = GetPlaylist({ playlistId: "7yBUhZvvCxKLk9jsYL9etb" });
  //setNextFetch(next);
  //setListOf(list);

  console.log("lista (primeira): ", list);

  const [list2, next2] = GetPlaylist({
    playlistId: "7yBUhZvvCxKLk9jsYL9etb",
    nextCall: next,
    previousList: list,
  });
  //   let listOf = [];
  //   for (let i = 0; i < list.length; i++) {
  //     console.log("Adding some ", list[i]);
  //     listOf.push(list[i]);
  //   }
  //   for (let i = 0; i < list2.length; i++) {
  //     listOf.push(list2[i]);
  //   }
  //   //   list.forEach((item) => {
  //   //     console.log("H", item);
  //   //     listOf.push(item);
  //   //   });
  //   //   list2.forEach((item) => listOf.push(item));
  //   //   listOf.push(list);
  //   //   listOf.push(list2);
  //   //   //   useEffect(() => {
  //   //     console.log("Next is: ", nextFetch);
  //   //     const [list2, next2] = GetPlaylist({
  //   //       playlistId: "7yBUhZvvCxKLk9jsYL9etb",
  //   //       nextCall: nextFetch,
  //   //     });
  //   //     setNextFetch(next2);

  //   //     console.log("List 2:::: ", list2);
  //   //     setListOf([...listOf, list2]);
  //   //   }, [listOf, nextFetch]);
  //   console.log("Lista 2: ", list2);
  console.log("Final list", list2);

  return <UserList userList={test}></UserList>;
};

export default Main;
