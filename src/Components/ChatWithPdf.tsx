import axios from "axios";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";

const ChatWithPdf = () => {
  const [inputOnFocus, setInputOnFocus] = useState<boolean>(false);
  const [response, setResponse] = useState<any>("Ai Response");
  const [userPrompt, setUserprompt] = useState<string>("");

  const getResponse = async () => {
    try {
      if (!userPrompt) {
        alert("Enter your prompt");
        return;
      }
      setResponse("");
      const payload = {
        user_prompt: userPrompt,
      };
      setUserprompt("");
      // Send a POST request to the '/upload_file' endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/get_response_for_user_prompt",
        payload
      );

      // Handle the response from the backend
      console.log("Response from backend:", response.data);
      if (response?.data?.output_text) {
        setResponse(response?.data?.output_text);
      }
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      // Handle errors here
      throw error;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        background:
          "linear-gradient(to bottom right, rgba(42, 2, 65, 1) 0%, rgba(42, 2, 65, 2) 100%, rgba(42, 2, 65, 0.5) 100%)",
      }}
    >
      <div style={{ width: "25%", height: "100%" }}>
        <ChatWithPdfSidebar />
      </div>
      <div style={{ width: "75%", height: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            height: "100%",
            rowGap: 30,
            padding: "50px 40px",
          }}
        >
          <div
            style={{
              color: "#A62694",
              fontSize: 48,
              fontWeight: 700,
              textAlign: "center",
              width: "100%",
            }}
          >
            Chat With Your Uploaded PDF👇🏻
          </div>
          <div
            style={{
              width: "80%",
              margin: "1px auto",
              position: "relative",
            }}
          >
            <div
              style={{
                paddingLeft: "10px",
                color: "#A894B6",
                fontSize: 12,
                paddingBottom: 6,
              }}
            >
              Ask a Question from the PDF Files
            </div>
            <input
              onFocus={() => setInputOnFocus(true)}
              onBlur={() => setInputOnFocus(false)}
              onChange={(e) => setUserprompt(e.target.value)}
              placeholder={"Enter Your prompt"}
              style={{
                width: "100%",
                height: "50px",
                borderRadius: "20px",
                paddingLeft: "30px",
                background: "#A894B6",
                outline: "none",
                border: inputOnFocus ? "2px solid #A62694" : "none",
                fontSize: 18,
                color: "#A62694",
              }}
            />
            <div style={{ position: "absolute", bottom: 10, right: "-10px" }}>
              <FiSend style={{ fontSize: "25px" }} onClick={getResponse} />
            </div>
          </div>
          <div
            style={{
              flexGrow: 4,
              paddingLeft: "100px",
              color: "#A894B6",
              textAlign: "start",
              width: "100%",
            }}
          >
            {`Response: ${response}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithPdf;

const ChatWithPdfSidebar = () => {
  const [uploadedFile, setUploadedFile] = useState<any>(null);

  const uploadPDF = async () => {
    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      // Send a POST request to the '/upload_file' endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/upload_file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from the backend
      console.log("Response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error uploading PDF file:", error);
      // Handle errors here
      throw error;
    }
  };

  return (
    <div
      style={{
        borderRight: "2px solid #A62694",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 15,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          wordBreak: "break-word",
          fontSize: 14,
          fontWeight: 600,
          color: "#A62694",
        }}
      >
        Upload your PDF Files and Click on the Submit & Process Button
      </div>
      <div
        style={{
          background: "",
          border: "1px solid white",
          width: "80%",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          position: "relative",
          padding: "10px 20px",
        }}
      >
        <div style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>
          <div>Drag and drop files here</div>
          <div style={{ fontSize: 12, fontWeight: 400, paddingTop: "20px" }}>
            Limit: 200mb
          </div>
        </div>
        <button
          style={{
            fontWeight: 400,
            fontSize: "16px",
            backgroundColor: "rgb(43, 44, 54)",
            color: "#fff",
            border: "1px solid rgba(250, 250, 250, 0.2)",
            width: "40%",
            borderRadius: "10px",
            padding: "15px 1px",
          }}
        >
          Browse files
        </button>
        <input
          type={"file"}
          onChange={(event: any) => {
            const file = event.target.files[0];
            setUploadedFile(file);
          }}
          style={{
            position: "absolute",
            inset: 0,
            // width: "150px",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>
      <button
        onClick={uploadPDF}
        style={{
          fontWeight: 400,
          fontSize: "16px",
          backgroundColor: "rgb(43, 44, 54)",
          color: "#fff",
          border: "1px solid rgba(250, 250, 250, 0.2)",
          width: "40%",
          borderRadius: "10px",
          padding: "15px 1px",
        }}
      >
        Submit & Process
      </button>
    </div>
  );
};
