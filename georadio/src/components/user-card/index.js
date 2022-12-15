import React from "react";
import StyledUserCard from "./index.styled";

const UserCard = (userName, qtty) => {
  let quantity = parseInt(userName.qtty);

  //let image = userName.img_url;
  if (isNaN(quantity)) {
    quantity = 0;
  }

  return (
    <StyledUserCard className="userCard">
      {/* {!!image && <img src={image} alt="image" />} */}
      <p className="username">{userName.userName}</p>
      <p className={`qtty${quantity > 5 ? "-red" : ""}`}>{quantity} músicas</p>
    </StyledUserCard>
  );
};

export default UserCard;
