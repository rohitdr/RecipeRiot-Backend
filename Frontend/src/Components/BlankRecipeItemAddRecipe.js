import React from "react";
import { Button } from "@nextui-org/react";
export default function BlankRecipeItemAddRecipe() {
  return (
    <>
      <div className="col-md-3">
        <div className="scene " style={{ backgroundColor: "transparent" }}>
          <div
            className="recipecard  card border-success "
            style={{ Width: "18rem" }}
          >
            <div className="face front">
              <div className="d-flex justify-content-center position-relative top-50 fw-bold fs-2 ">
                <Button auto ghost color="gradient">
                  Add Recipe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
