import { useUser } from "lib/hooks";

const AdminPage = () => {
  const user = useUser({
    redirectTo: "/admin ",
    redirectIfFound: false,
  });
  return <div className="containerSize">Hello</div>;
};
export default AdminPage;
