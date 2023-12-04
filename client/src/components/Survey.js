import React from "react";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SurveyForm from "./SurveyForm";

const Survey = () => {
  let auth = useSelector((state) => state.auth);

  if (auth.user) {
    return <SurveyForm />;
  } else {
    return redirect("/auth/google");
  }
};

export default Survey;
