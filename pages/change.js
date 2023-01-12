import { useState } from "react";
import { useUser } from "lib/hooks";
import PasswordForm from "components/password-form";

const Change = () => {
  const user = useUser({ redirectTo: "/login", redirectIfFound: false });

  const [errorMsg, setErrorMsg] = useState("");

  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (successMsg) setSuccessMsg("");
    if (errorMsg) setErrorMsg("");

    if (e.currentTarget.password.value === e.currentTarget.password1.value) {
      const body = {
        userId: user.id,
        password: e.currentTarget.password.value,
      };
      try {
        const res = await fetch("/api/user/user-passchange", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          setSuccessMsg("Амжилттай хадгалагдлаа");
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
      }
    } else {
      setErrorMsg("Нууц үгээ дахин хийнэ үү");
    }
  }

  return (
    <div className="containerSize">
      <div className="login">
        <PasswordForm
          successMessage={successMsg}
          errorMessage={errorMsg}
          onSubmit={handleSubmit}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Change;
