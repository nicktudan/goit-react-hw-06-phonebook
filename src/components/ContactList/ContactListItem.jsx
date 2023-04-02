import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contactsSlice';
import { ContactListItems, ContactListItemsData, ContactListItemsBtn } from './ContactList.styled'

export const ContactListItem = ({ contact: { id, name, number } }) => {
    const dispatch = useDispatch();

    return (
      <ContactListItems>
        <ContactListItemsData>{name}:</ContactListItemsData>
        <ContactListItemsData>{number}</ContactListItemsData>
        <ContactListItemsBtn
          type="submit"
          onClick={() => dispatch(deleteContact(id))}
        >
          Delete
        </ContactListItemsBtn>
      </ContactListItems>
    );
}

ContactListItem.propTypes = {
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
}