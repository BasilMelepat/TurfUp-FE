import useLoginForm from "../../hooks/useLoginForm";
import FormField from "../../components/common/FormField";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();

  return (
     <div className="flex items-center justify-center  min-h-screen max-md:p-4 bg-base-200 p-4 ">
      <div className="card w-full border md:w-96  bg-base-100 shadow-xl  ">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <FormField
              label="Password"
              name="password"
              type="password"
              register={register}
              error={errors.password}
            />
            <div className="form-control mt-6">
              <Button type="submit" className="text-white no bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center" loading={loading}>
                Login
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Link to="/signup" className="from-left">
              Don&#39;t have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
