import React, { useState } from "react";
import { FullUserData } from "./types";
import { Dropdown } from "../common/Dropdown";
import { Formik, Form } from "formik";

import * as Yup from "yup";
import { RichTextEditor } from "../common/RichTextField";
import { Button } from "../common/Button";

interface SettingsTabProps {
  data: FullUserData;
}

type FormValues = {
  about: string;
};

const validationsSchema = Yup.object().shape({
  about: Yup.string(),
});

export const SettingsTab: React.FC<SettingsTabProps> = () => {
  const options = ["Edit", "Delete"];
  const initialValues: FormValues = {
    about: "",
  };

  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  return (
    <div className="flex flex-col md:max-2xl:flex-row gap-4 ">
      <div className="flex shrink-0 w-full md:max-2xl:hidden">
        <Dropdown
          options={options}
          handleOptionSelect={setSelectedOption}
          selectedOption={selectedOption}
        />
      </div>
      <div className="md:max-2xl:w-1/4 min-w-auto hidden md:max-2xl:block">
        <ul className="list space-y-2 text-sm">
          {options.map((option) => (
            <li
              key={option}
              className={`tab ${
                selectedOption === option ? "active-tab" : "inactive-tab"
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        <>
          <div className="text-xl font-bold border-b border-b-appGray-50 mb-6 pb-6">
            {`${selectedOption} Profile`}
          </div>
          {selectedOption === "Edit" && (
            <div className="list">
              <div className="card">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationsSchema}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                >
                  {() => (
                    <Form>
                      <div>
                        <div>
                          <RichTextEditor
                            name="about"
                            placeholder="Tell us about yourself"
                            label="About me"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-4">
                        <button type="submit" className="btn-primary">
                          Save
                        </button>

                        <button
                          type="reset"
                          className="btn-outline border-0 text-blue-500 py-2 hover:bg-blue-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          )}
          {selectedOption === "Delete" && (
            <div className="w-full">
              <Button
                className="btn-primary bg-red-500 hover:bg-red-700"
                title="Delete profile"
                onClick={() => {}}
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
};
