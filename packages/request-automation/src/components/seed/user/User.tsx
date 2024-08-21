import React, { useState } from "react";

import UpdateEmailAuth from "./UpdateEmailAuth";
import ActiveUser from "./ActiveUser";
import AddUser from "./AddUser";

function User() {
  const [message, setMessage] = useState<string[]>([]);

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <AddUser setMessage={setMessage} />
      <ActiveUser setMessage={setMessage} />
      <UpdateEmailAuth setMessage={setMessage} />

      {message.length ? (
        <div>
          <h5>Console</h5>
          {message.map((mes) => (
            <p>{mes}</p>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default User;
