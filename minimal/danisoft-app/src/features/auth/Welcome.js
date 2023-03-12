import { H1, H3 } from "../../components/Typography";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { username, status } = useAuth();
  console.log("🚀 ~ file: Welcome.js:5 ~ Welcome ~ useAuth:", username);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <H1>Hi {username}, welcome back!</H1>
      <H3>Status: {status}</H3>
    </section>
  );

  return content;
};
export default Welcome;
