import React, { useContext } from "react";
import PropTypes from "prop-types";
import ContactContext from "../../context/contact/contactContext";

const ContactsItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const { _id, name, email, phone, type } = contact;
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
  };
  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name + " "}
        <span
          style={{ float: "right" }}
          className={
            "badge " +
            (type === "professional" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelop-open"></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <button
        className="btn btn-dark btnbtn-sm"
        onClick={() => {
          setCurrent(contact);
        }}
      >
        Edit
      </button>
      <button className="btn btn-danger btnbtn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactsItem.prototype = {
  contact: PropTypes.object.isRequired,
};
export default ContactsItem;
