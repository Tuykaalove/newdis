import { useUser } from "lib/hooks";
import Image from "next/image";

const Home = () => {
  useUser({
    redirectTo: "/login",
    redirectIfFound: false,
  });
  return (
    <div className="containerSize">
      <Image src="/logo.png" alt="me" width="600" height="600" />
    </div>
  );
};

export default Home;
