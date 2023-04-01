import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-light text-center text-white">
        <div className="container p-4 pb-0">
          <section className="mb-4">
            <a
              className="btn btn-primary bg-success btn-floating m-1 rounded-5"
              href="https://wa.me/7009962845?text=Hlo"
              role="button"
            >
              <i className="fa  fa-whatsapp"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1 rounded-5"
              style={{ backgroundColor: "#55acee" }}
              href="https://mobile.twitter.com/Rohit35501973"
              role="button"
            >
              <i className="fab fa-twitter"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1 rounded-5"
              style={{ backgroundColor: "#dd4b39" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-google"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1 rounded-5"
              style={{ backgroundColor: "#ac2bac" }}
              href="#!"
              role="button"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1 rounded-5"
              style={{ backgroundColor: "#0082ca" }}
              href="https://www.linkedin.com/in/rohit-kumar-135b731b4"
              role="button"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>

            <a
              className="btn btn-primary btn-floating m-1 rounded-5"
              style={{ backgroundColor: "#333333" }}
              href="https://github.com/rohitdr"
              role="button"
            >
              <i className="fab fa-github"></i>
            </a>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <a className="text-white">RecipeRiot.com</a>
        </div>
      </footer>
    </>
  );
}
