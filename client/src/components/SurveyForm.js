import React, { useRef } from "react";

const SurveyForm = () => {
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const subjectRef = useRef(null);
  const recipientsRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Access field values using refs
    console.log("Title:", titleRef.current.value);
    console.log("Body:", bodyRef.current.value);
    console.log("Subject:", subjectRef.current.value);
    console.log("Recipients:", recipientsRef.current.value);
    // You can perform further actions or validations with the field values here
  };

  return (
    <form style={{ maxWidth: "400px", margin: "auto" }} onSubmit={handleSubmit}>
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
      <button type="submit" style={{ padding: "8px 16px", fontSize: "16px" }}>
        Submit
      </button>
    </form>
  );
};

export default SurveyForm;
