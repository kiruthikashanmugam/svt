// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuths } from "./AuthProviders";

// export function AuthStatus() {
//   const auth = useAuths();
//   const navigate = useNavigate();

//   const handleSignOut = () => {
//     auth.signout(() => navigate("/admin"));
//   };

//   if (!auth.user) {
//     return <p>Please log in</p>;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button onClick={handleSignOut}>Sign out</button>
//     </p>
//   );
// }
