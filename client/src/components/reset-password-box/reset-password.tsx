import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Controller,
} from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  password: z.string().min(6),
});

interface FormData extends FieldValues {
  password: string;
}

interface PropsType {
  goBack: () => void;
  goNext: () => void;
}

const ResetPasswordForm = (props: PropsType) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("Form data:", data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    props.goNext();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-DDE6ED">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl font-bold text-526D82 mb-6">Reset Password</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-27374D text-sm font-semibold mb-2"
            >
              New Password:
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    id="email"
                    className={`w-full p-2 border rounded ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password?.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-[#526D82] text-white font-bold py-2 px-4 rounded hover:bg-9DB2BF"
            >
              Reset Password
            </button>
            <a onClick={props.goBack} className="text-9DB2BF hover:underline">
              Back To login Page
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
