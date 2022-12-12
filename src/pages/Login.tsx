import axios from "axios";
import React, { useEffect, useState } from "react";

const  Login = React.memo(() => {
  const [reciceDate, setResivDate] = useState();

  const login = () => {};

  return (
    <>
   
      {JSON.stringify(reciceDate)}
      <div>
        <button onClick={() => login()}>Send</button>
        <p></p>
      </div>
    </>
  );
});


export default Login;