import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({
        message: "Account created successfully",
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(error);
      showToast({
        message: error.response.data.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data: RegisterFormData) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label
          htmlFor="firstName"
          className="flex-1 text-gray-700 text-sm font-bold"
        >
          FirstName
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "The field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label
          htmlFor="lastName"
          className="flex-1 text-gray-700 text-sm font-bold"
        >
          LastName
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "The field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label htmlFor="email" className="flex-1 text-gray-700 text-sm font-bold">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "The field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label
        htmlFor="password"
        className="flex-1 text-gray-700 text-sm font-bold"
      >
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "The field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>

      <label
        htmlFor="confirmPassword"
        className="flex-1 text-gray-700 text-sm font-bold"
      >
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "The field is required",
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      <span>
        <button
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
          type="submit"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
