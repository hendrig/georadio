import React from "react";
import StyledUserCard from "./index.styled";

const UserCard = (userName, qtty) => {
  let quantity = parseInt(userName.qtty);

  let image = userName.img_url;
  if (isNaN(quantity)) {
    quantity = 0;
  }
  console.log(userName)

  return (
    <StyledUserCard className="userCard">
      <img src={image} alt="image"/>
      <p className="username">
        {userName.userName}
      </p>
      <p className={`qtty${quantity > 5 ? "-red":""}`}>{quantity} músicas</p>
    </StyledUserCard>
  );
};

export default UserCard;
