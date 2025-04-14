"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { registerAction } from "@/app/(auth)/actions";

import { DATA_CY_ELEMENTS } from "@/lib/constants";
import { registerSchema, RegisterSchemaType } from "@/lib/zod-schemas";

import { LoadingButton } from "@/components/loading-button";
import { PasswordInput } from "@/components/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const t = useTranslations("RegisterForm");

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema(t)),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  async function onSubmit(data: RegisterSchemaType) {
    startTransition(async () => {
      const response = await registerAction(data);

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name.label")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name.placeholder")} data-cy={DATA_CY_ELEMENTS.registerForm.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  data-cy={DATA_CY_ELEMENTS.registerForm.email}
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
                  data-cy={DATA_CY_ELEMENTS.registerForm.password}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("confirmPassword.label")}</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder={t("confirmPassword.placeholder")}
                  data-cy={DATA_CY_ELEMENTS.registerForm.confirmPassword}
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
            data-cy={DATA_CY_ELEMENTS.registerForm.submitButton}
          >
            {t("registerSubmit")}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
