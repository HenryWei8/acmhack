import { client } from "$lib/client";
import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json();
  const count = data.count as number;
  const userid = cookies.get("userid");

  if (!count || !userid) {
    return new Response(
      JSON.stringify({ status: 500, message: "Error missing data!" })
    );
  }

  const updatedCount = await client.count.update({
    where: {
      id: userid,
    },
    data: {
      count: count,
    },
  });

  if (!updatedCount) {
    return new Response(
      JSON.stringify({ status: 500, message: "Error unsuccessful!" })
    );
  }

  return new Response(JSON.stringify({ status: 303, message: "Success!" }));
};
