import React, { Component } from "react";

export default function Loader() {
  return (
    <>
      {/* <div className="text-center text-success">
        <div
          className="spinner-border"
          style={{ width: "1rem", height: "1rem" }}
          role="status"
        >
          <span className="sr-only"></span>
        </div>
      </div> */}
    <div className="loadercontainer">
<div className="loader-circle-11">
  <div className="arc"></div>
  <div className="arc"></div>
  <div className="arc"></div>
</div>
</div>
    </>
  );
}
