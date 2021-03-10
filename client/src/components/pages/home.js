import React, { useContext, useEffect } from "react";
import ContactFilter from "../contacts/contactFilter";
import ContactForm from "../contacts/contactForm";
import Contacts from "../contacts/contacts";
import AuthContext from "./../../context/auth/authContext";
const Home = () => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
