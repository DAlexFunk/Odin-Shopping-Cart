import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function ErrorPage() {
  const [home, setHome] = useState(false);

  if (home) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="errorPage">
      <div className="faceEmoticon"></div>
      <p>404 ERROR: Unknown page</p>
      <p>
        Click to return home:{" "}
        <button onClick={() => setHome(true)}>Go Home</button>
      </p>
    </main>
  );
}
