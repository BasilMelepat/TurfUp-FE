import React from 'react';
import { Mail, Lock } from 'lucide-react';
import useLoginForm from "../../hooks/useLoginForm";
import FormField from "../../components/common/FormField";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit, loading } = useLoginForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="self-center">
            <Link to="/auth" className="no">
              <img src="/logo.png" alt="TurfUp" className="animate-slide-in-bottom h-20 w-20"/>
            </Link>
          </div>
          <h2 className="card-title justify-center mb-4">Login to your Account</h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              label="Email"
              name="email"
              type="email"
              icon={Mail}
              register={register}
              error={errors.email}
              placeholder="Enter your email"
            />
            
            <FormField
              label="Password"
              name="password"
              type="password"
              icon={Lock}
              register={register}
              error={errors.password}
              showPasswordToggle={true}
              placeholder="Enter your password"
            />
            <div className="form-control mt-6">
              <Button 
                type="submit" 
                className="text-white no bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center me-2 mt-4" 
                loading={loading}
              >
                Login
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            Don't have an account? 
            <Link to="/signup" className="text-primary from-left ml-1">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;