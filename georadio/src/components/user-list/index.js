import UserCard from "../user-card";
import UserListStyled from "./index.styled";

const UserList = ({ userList }) => {
  return (
    <UserListStyled>
      {userList.map((u) => (
        <UserCard
          key={u.userName}
          userName={u.userName}
          qtty={u.qtty}
          // img_url={u.img_url}
        />
      ))}
    </UserListStyled>
  );
};

export default UserList;
