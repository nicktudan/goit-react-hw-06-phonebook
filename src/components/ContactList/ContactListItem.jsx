// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';

import {
  ContactListItems,
  ContactListItemsData,
  ContactListItemsBtn,
} from './ContactList.styled';

export const ContactListItem = ({ name, number, id }) => {
  const dispatch = useDispatch();

  return (
    <ContactListItems>
      <ContactListItemsData>{name}:</ContactListItemsData>
      <ContactListItemsData>{number}</ContactListItemsData>
      <ContactListItemsBtn
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </ContactListItemsBtn>
    </ContactListItems>
  );
};

// ContactListItem.propTypes = {
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired,
// };
