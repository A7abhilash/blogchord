import React from "react";

function SelectOptions({ selectOptions, selectedOption }) {
  const options = [
    {
      id: "all",
      title: "Blogs",
    },
    {
      id: "public",
      title: "Public Blogs",
    },
    {
      id: "private",
      title: "Private Blogs",
    },
    {
      id: "saved",
      title: "Saved Blogs",
    },
  ];
  return (
    <div className="mx-auto my-2 d-flex justify-content-around pt-2 text-center">
      {options.map((option) =>
        option.id === selectedOption ? (
          <div key={option.id} className="options text-danger">
            <h6>{option.title}</h6>
          </div>
        ) : (
          <div
            key={option.id}
            className="options"
            onClick={() => selectOptions(option.id)}
          >
            <h6>{option.title}</h6>
          </div>
        )
      )}
    </div>
  );
}

export default SelectOptions;
