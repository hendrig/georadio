import React from "react";

const UserCard = (userName, qtty) => {
  let quantity = parseInt(qtty);

  if (isNaN(quantity)) {
    quantity = 0;
  }

  return (
    <div>
      <p>
        {userName}: {quantity}
      </p>
    </div>
  );
};

export default UserCard;
