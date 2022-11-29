import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { TenantLoginForm } from "../../api/tenant/types";
import TextInput from "../../components/form/text";
import { emailRegex } from "../../helpers/regex";
import useTranslation from "../../i18n/useTranslation";
import { useAuthContext } from "./context";

const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TenantLoginForm>();

  const { t } = useTranslation();
  const {
    actions: { login },
  } = useAuthContext();

  const [loading, setLoading] = useState(false);

  async function onSubmit(form: TenantLoginForm) {
    setLoading(true);
    await login(form);
    setLoading(false);
  }

  return (
    <div className="px-6 h-screen flex items-center">
      <div className=" w-full max-w-md mx-auto">
        <h1 className="text-3xl font-medium">Sign in to MiTienda</h1>
        <div className="mt-2">
          <span className="">New user?</span>
          <Link
            className="text-purple-700 dark:text-purple-500 hover:underline ml-1"
            href="/signup"
          >
            Create an account
          </Link>
        </div>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email address"
            full
            error={errors.email?.message}
            inputProps={{
              placeholder: "test@example.test",
              ...register("email", {
                required: t("This field is required"),
                pattern: {
                  value: emailRegex,
                  message: "Enter a valid email",
                },
              }),
            }}
          />
          <div className="w-2 h-3" />
          <TextInput
            label="Password"
            full
            error={errors.password?.message}
            inputProps={{
              placeholder: "********",
              type: "password",
              ...register("password", {
                required: t("This field is required"),
              }),
            }}
          />
          <button
            className="w-full py-3 bg-dark-500 text-white rounded-lg font-medium mt-10 dark:bg-slate-50 dark:text-dark-800 dark:hover:bg-slate-200 transition-all hover:bg-dark-800 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
