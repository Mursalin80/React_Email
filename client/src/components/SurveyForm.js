import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

let formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 to 30 characters").max(30),
  body: z.string().min(5, "Body must be at least 5 to 500 characters").max(500),
  subject: z
    .string()
    .min(5, "Subject must be at least 5to 50 characters")
    .max(50),
  recipients: z
    .string()
    .min(5, "Recipients email must be at least 5 characters"),
});
// export type TformSchema = z.infer<typeof formSchema>;

const SurveyForm = () => {
  let auth = useSelector((state) => state.auth);
  let {
    formState: { errors, isLoading },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const formSubmit = async ({ title, body, subject, recipients }) => {
    let survey = await axios.post("/api/survey", {
      title,
      body,
      subject,
      recipients,
    });

    console.log({ survey });
    reset();
  };

  return (
    <form
      style={{ maxWidth: "400px", margin: "auto" }}
      onSubmit={handleSubmit(formSubmit)}
    >
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
        <input
          type="text"
          {...register("title")}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.title && (
          <p style={{ color: "red" }}>{`${errors.title.message}`}</p>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Body</label>
        <input
          type="text"
          {...register("body")}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.body && (
          <p style={{ color: "red" }}>{`${errors.body.message}`}</p>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Subject</label>
        <input
          type="text"
          {...register("subject")}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.subject && (
          <p style={{ color: "red" }}>{`${errors.subject.message}`}</p>
        )}
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Recipients
        </label>
        <input
          type="text"
          {...register("recipients")}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        {errors.recipients && (
          <p style={{ color: "red" }}>{`${errors.recipients.message}`}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={auth.user?.credits < 5 || isLoading}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        {auth.user?.credits < 5 ? "Your credit is less then 5" : "Submit"}
      </button>
    </form>
  );
};

export default SurveyForm;
