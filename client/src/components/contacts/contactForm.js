import React, { useState, useContext, useEffect } from "react";
import ContactContext from "./../../context/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setConact(current);
    } else {
      setConact({
        name: "",
        email: "",
        phone: "",
        type: "personal",
      });
    }
  }, [current, contactContext]);

  const [contact, setConact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal",
  });
  const { name, email, phone, type } = contact;
  const onChange = (e) => {
    setConact({ ...contact, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    setConact({
      name: "",
      email: "",
      phone: "",
      type: "personal",
    });
    clearCurrent();
  };
  const clearAll = () => {
    clearCurrent();
  };
  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value={current ? "Edit Contact" : "Add Contact"}
        />
      </div>
      {current && (
        <div>
          <button className="btn-block btn-light" onClick={clearAll}>
            Clear
          </button>{" "}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
