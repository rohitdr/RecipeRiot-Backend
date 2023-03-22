import React from "react";
import NoResult from "./NoResult";
import { Button } from "@nextui-org/react";
import AnimatedPage from "./AnimatedPage";

export default function InternalServerError() {
  
  return (
    <><AnimatedPage>
      <NoResult
        heading="Internal Server Error"
        button={
          <Button className="text-center" color="gradient" ghost auto onClick={()=>{window.location.href = '/Home'}}>
            HOME
          </Button>
        }
        paragraph="the server encountered an unexpected condition that prevented it from fulfilling the request."
        img="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
      ></NoResult></AnimatedPage>
    </>
  );
}
