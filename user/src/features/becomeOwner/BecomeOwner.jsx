import FormField from "../../components/common/FormField";
import Button from "../../components/common/Button";
import useBecomeOwner from "../../hooks/useBecomeOwner";


const BecomeOwner = () => {
  const { register, handleSubmit, errors, onSubmit, loading } =
    useBecomeOwner();
  return (
    <div className="container mx-auto mt-20  p-2">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Become a Turf Owner
      </h1>
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              error={errors.name}
              
            />
            <FormField
              label="Email (use only valid email)"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="text"
              register={register}
              error={errors.phone}
            />
            <Button className="text-white no bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-10 btn-lg w-full mt-6" loading={loading}>
              Submit Application
            </Button>
          </form>
        </div>

        {/* content section */}
        <div className=" ">
          <div className=" shadow-md border p-6 rounded-lg h-full">
            <h2 className="text-2xl font-semibold mb-4">
              Becoming a Turf Owner
            </h2>
            <p className="mb-4">
              Join our platform as a turf owner and start managing your sports
              facilities efficiently. Here&#39;s what you need to know:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>Fill out the application form with your details.</li>
              <li>Our admin team will review your application thoroughly.</li>
              <li>
                <b>You&#39;ll receive an email with the decision on your
                application.</b>
              </li>
              <li>
                If approved, the email will contain a link to create your owner
                account.
              </li>
              <li>
                Once your account is set up, you can start managing your turf
                business.
              </li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">
              As a Turf Owner, you can:
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Add and manage multiple turfs</li>
              <li>View, Sort and filter bookings</li>
              <li>View your turf booking payments</li>
              <li>Set availability and pricing</li>
              <li>View customers reviews</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeOwner;
