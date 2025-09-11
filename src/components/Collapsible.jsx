import React, { useState, useRef } from "react";

const Collapsible = ({ label, children }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="collapsible">
      <div className="collapsible-header">
        <span className="label">{label}</span>
        <button
          className="toggle-button"
          onClick={() => setOpen(!open)}
        >
          {open ? "▲" : "▼"}
        </button>
      </div>
      <div
        ref={contentRef}
        className="content-parent"
        style={{
          height: open ? contentRef.current?.scrollHeight + "px" : "0px",
        }}
      >
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;
