import React, { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const SurveyForm = () => {
  let auth = useSelector((state) => state.auth);

  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const subjectRef = useRef(null);
  const recipientsRef = useRef(null);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let survey = await axios.post("/api/survey", {
      title: titleRef.current.value,
      body: bodyRef.current.value,
      subject: subjectRef.current.value,
      recipients: recipientsRef.current.value,
    });

    console.log({ survey });
    // formRef.current.reset();
  };

  return (
    <form
      style={{ maxWidth: "400px", margin: "auto" }}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Title</label>
        <input
          type="text"
          ref={titleRef}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Body</label>
        <input
          type="text"
          ref={bodyRef}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Subject</label>
        <input
          type="text"
          ref={subjectRef}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Recipients
        </label>
        <input
          type="text"
          ref={recipientsRef}
          style={{
            padding: "8px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <button
        type="submit"
        disabled={auth.user?.credits < 5}
        style={{ padding: "8px 16px", fontSize: "16px" }}
      >
        {auth.user?.credits < 5 ? "Your credit is less then 5" : "Submit"}
      </button>
    </form>
  );
};

export default SurveyForm;
