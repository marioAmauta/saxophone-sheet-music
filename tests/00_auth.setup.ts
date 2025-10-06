import { test as setup } from "@playwright/test";

import { Roles } from "@/lib/enums";

import { deleteUser, updateUserRole } from "./data-access/user";

const newTestUser = {
  name: "John",
  email: "john@gmail.com",
  password: "hello-sax"
};

setup("Sign up new user and save logged state", async ({ request }) => {
  await deleteUser({ email: newTestUser.email });

  await request.post("/api/auth/sign-up/email", {
    data: { ...newTestUser }
  });

  await request.storageState({ path: "playwright/.auth/user.json" });
});

const newTestAdmin = {
  name: "Neo",
  email: "neo@gmail.com",
  password: "hello-sax-admin"
};

setup("Sign up new admin user and save logged state", async ({ request }) => {
  await deleteUser({ email: newTestAdmin.email });

  await request.post("/api/auth/sign-up/email", {
    data: { ...newTestAdmin }
  });

  await updateUserRole({
    email: newTestAdmin.email,
    role: Roles.Admin
  });

  await request.storageState({ path: "playwright/.auth/admin.json" });
});
