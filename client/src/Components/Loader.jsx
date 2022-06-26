import React from "react";
import { ProgressBar, Row, Spinner } from "react-bootstrap";

const Loader = ({
  width = "50px",
  height = "50px",
  dark = false,
  variant = "success",
  percent = true,
  progress,
}) => {
  return (
    <>
      <div className="p-4 text-center">
        <Row>
          {!progress ? (
            <>
              <Spinner
                animation="border"
                role="status"
                style={{
                  width: `${width}`,
                  height: `${height}`,
                  margin: "auto",
                  display: "inline-block",
                }}
              ></Spinner>
              <p
                style={{
                  color: `${dark ? "var(--bs-white)" : "var(--primary)"}`,
                }}
              >
                Fetching Data...
              </p>
            </>
          ) : (
            <ProgressBar
              variant={variant}
              label={`${progress}%`}
              striped
              animated
              now={`${progress}`}
            />
          )}
        </Row>
      </div>
    </>
  );
};

export default Loader;
