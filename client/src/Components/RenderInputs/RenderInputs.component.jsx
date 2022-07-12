import styles from "./RenderInputs.module.css";
import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";

/**
 * @description - This component is used to render the inputs for the form.
 * @param {formData} formData - formData is an object that contains the form data, a list of keys and values to be rendered
 * @param {setFunc} setFunc - setFunc is a function that sets the formData to the new value
 *
 * @returns {JSX} - A group of inputs that are rendered based on the formData object
 * @example - <RenderInputs formData={formData} setFunc={setFunc} />
 * @author - Austin Howard
 * @version - 1.0
 */
const RenderInputs = ({ formData, setFunc, ignoreKeys }) => {
  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFunc({ ...formData, [name]: value });
  };

  return (
    <div className={styles.formGroup}>
      {Object.entries(formData).map((key, indx) => {
        // check if the key is in the ignoreKeys array
        if (ignoreKeys && key[0] in ignoreKeys) {
          return null;
        } else {
          // check if the type of the input is a string, date, or number
          if (typeof key[1] === "string") {
            return (
              <FloatingLabel
                controlId={`floatingLable${key[0]+indx}`}
                // keys are camelCase, so we need to split them at the first capital letter to get the correct label
                label={key[0]
                  .split(/(?=[A-Z])/)
                  .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  })
                  .join(" ")}
                className="mb-3"
                key={key[0] + indx}
              >
                <Form.Control
                  type="text"
                  placeholder="..."
                  name={key[0]}
                  required
                  value={[formData[key[0]]]}
                  onChange={handleChange}
                />
              </FloatingLabel>
            );
          } else if (typeof key[1] === "number") {
            return (
              <FloatingLabel
                controlId={`floatingLable${key[0]+indx}`}
                label={key[0]
                  .split(/(?=[A-Z])/)
                  .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  })
                  .join(" ")}
                className="mb-3"
                key={key[0] + indx}
              >
                <Form.Control
                  type="number"
                  placeholder="..."
                  name={key[0]}
                  value={[formData[key[0]]]}
                  onChange={handleChange}
                />
              </FloatingLabel>
            );
          } else if (typeof key[1] === "boolean") {
            return (
              <Form.Check
                type="switch"
                name={key[0]}
                checked={formData.isEdge}
                onChange={(e) => {
                  setFunc({ ...formData, [e.target.name]: !key[1] });
                }}
                id="custom-switch"
                label={key[0]
                  .split(/(?=[A-Z])/)
                  .map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1);
                  })
                  .join(" ")}
              />
            );
          }
          // else if (typeof key[1] === "function") {
          //   return (
          //     <Input
          //       key={key[0] + key[1] + indx}
          //       name={key[0]}
          //       value={key[1]}
          //       label={key[0]
          //         .split("_")
          //         .map((word) => {
          //           return word.charAt(0).toUpperCase() + word.slice(1);
          //         })
          //         .join(" ")}
          //       onChange={handleChange}
          //       type="date"
          //     />
          //   );
          // }
          // we need to handle the case where the type is an array of objects
          else if (typeof key[1] === "array") {
            // go through the array and render each object
            return <RenderInputs formData={key[1]} setFunc={setFunc} />;
          } else {
            return null;
          }
        }
      })}
    </div>
  );
};

export default RenderInputs;
