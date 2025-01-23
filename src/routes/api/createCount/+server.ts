import { client } from "$lib/client";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies, request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;

  if (!username) {
    return new Response(
      JSON.stringify({ status: 500, message: "Error no username!" })
    );
  }

  const newCount = await client.count.create({
    data: {
      user: username,
      count: 0,
    },
  });

  if (!newCount) {
    return new Response(
      JSON.stringify({ status: 500, message: "Error unsuccessful!" })
    );
  }

  cookies.set("userid", newCount.id, {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
  });

  throw redirect(303, "/backend");
};
