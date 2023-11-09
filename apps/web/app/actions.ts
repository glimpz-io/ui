"use server";

import sg from "@sendgrid/client";
import { redirect } from "next/navigation";

export async function submitEmail(fieldName: string, formData: FormData, referralCode?: string) {
    const email = formData.get(fieldName);
    if (!email) return;

    const apiKey = process.env.SENDGRID_API_KEY;
    const listId = process.env.SENDGRID_LIST_ID;
    if (!apiKey || !listId) throw Error("missing sendgrid api key");

    sg.setApiKey(apiKey);

    // **** Here we will need to generate a unique code

    // const [response] = await sg.request({
    //     url: "/v3/marketing/contacts",
    //     method: "PUT",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: {
    //         list_ids: [listId],
    //         contacts: [{ email }],
    //     },
    // });

    // if (response.statusCode < 200 || response.statusCode >= 300) throw Error("call failed for reason '" + JSON.stringify(response.body) + "'");

    redirect("/subscribed");
}
