import { client } from "$lib/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
  const userid = cookies.get("userid");

  let user;
  if (userid) {
    user = await client.count.findUnique({
      where: {
        id: userid,
      },
    });
  }
  let allUsers = null;
  if (user) {
    allUsers = await client.count.findMany({
      where: {
        id: {
          not: userid,
        },
      },
    });
  } else {
    allUsers = await client.count.findMany({});
  }
  return {
    user: user ?? null,
    users: allUsers ?? null,
  };
};
