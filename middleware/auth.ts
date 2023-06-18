import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import getLocalStorageItem from "~/utilities/getLocalStorageItem";

export default defineNuxtMiddleware(async (ctx) => {
  const user = await getLocalStorageItem("quizUserData");
  const notAuth = (user && !user.isLogged) || !user;

  if (notAuth) {
    ctx.redirect("/login");
  }
});
