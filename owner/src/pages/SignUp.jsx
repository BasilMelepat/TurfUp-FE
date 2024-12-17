import { Link } from "react-router-dom";
import useSignUpForm from "@hooks/useSignUpForm";
import { Button, FormField } from "@components/common";

const SignUp = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useSignUpForm();
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl border">
      <div className="card-body max-md:p-4">
          <div className="self-center">
            <Link to="/auth" className="no">
              <img src="/logo.png" alt="TurfUp" className="animate-slide-in-bottom h-20 w-20"/>
            </Link>
          </div>
          <h2 className="card-title justify-center mb-4">Create new Account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="lg:grid grid-cols-2 gap-4">
              <FormField
                label="Name"
                name="name"
                type="text"
                register={register}
                error={errors.name}
              />
              <FormField
                label="Phone Number"
                name="phone"
                type="text"
                register={register}
                error={errors.phone}
              />
            </div>
            <FormField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <div className="lg:grid grid-cols-2 gap-4">
              <FormField
                label="Password"
                name="password"
                type="password"
                register={register}
                error={errors.password}
              />
              <FormField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                register={register}
                error={errors.confirmPassword}
              />
            </div>

            <div className="form-control mt-12 pt-6 ">
              <Button
                type="submit"
                className="text-white no bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center me-2 mt-4"
                loading={loading}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">Already have an account? <Link to="/login" className="from-left text-primary">
               Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
