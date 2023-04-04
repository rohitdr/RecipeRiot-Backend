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
    <div class="loadercontainer">
<div class="loader-circle-11">
  <div class="arc"></div>
  <div class="arc"></div>
  <div class="arc"></div>
</div>
</div>
    </>
  );
}
