"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { loginAction } from "@/app/(auth)/actions";

import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { loginSchema, LoginSchemaType } from "@/lib/zod-schemas";

import { GoogleLogin } from "@/components/google-login";
import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  const t = useTranslations("LoginForm");

  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema(t)),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: LoginSchemaType) {
    startTransition(async () => {
      const response = await loginAction(data);

      if (response && !response.success) {
        toast.error(response.errorMessage, { duration: 5000 });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-lg space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("email.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.loginForm.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("password.label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("password.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.loginForm.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-4">
          <LoadingButton
            type="submit"
            className="w-full"
            loading={isPending}
            data-cy={DATA_CY_ELEMENTS.loginForm.submitButton}
          >
            {t("loginSubmit")}
          </LoadingButton>
          <Separator className="my-4" />
          <GoogleLogin />
        </div>
      </form>
    </Form>
  );
}
