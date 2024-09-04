import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { AiTwotoneLock } from "react-icons/ai";
import { AiTwotoneMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Message from "../../components/ui/Message";
import localforage from "localforage";
import reserveAPI from "../../api/api";
import { useDispatch } from "react-redux";
import {setCurrentUser} from '../../redux/actions/actions';

const Login = () => {
  const [userError, setUserError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postLoginData = async (data) => {
    const args = {
      method: "POST",
      route: "/login",
      data,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    };
    const result = await reserveAPI(args);
    
    if (!result?.success) {
      throw result;
    }
    return result;
  };

  const signIn = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      const adminData = await postLoginData({ email, password });
      dispatch(setCurrentUser(adminData))
      await localforage.setItem("admin", adminData);
      if (adminData) navigate("/dashboard");
      console.log("Signed In successfully!");
    } catch (error) {
      setUserError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (error) => {
    //TODO: Change how error are handled
    switch (error.error.statusCode) {
      case 401:
        return "Invalid email or password. Please check your credentials and try again.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  return (
    <section className="grid place-items-center max-w-xl mx-auto">
      <div className="w-full border p-4 rounded-md space-y-1">
        <div className="mb-8">
          <h2>SignIn</h2>
          <p>Unlock the smarter way to travel</p>
        </div>
        <form onSubmit={signIn} className="space-y-4">
          <Input
            type="email"
            name="email"
            label="Email"
            required
            placeholder="fakemail@gmail.com"
            icon={<AiTwotoneMail />}
          />
          <Input
            type="password"
            name="password"
            label="Password"
            required
            placeholder="Fake@123"
            icon={<AiTwotoneLock />}
          />
          {userError && <Message message={userError} />}
          <Button type="submit" text="SignIn" loading={loading} />
        </form>
      </div>
    </section>
  );
};

export default Login;
