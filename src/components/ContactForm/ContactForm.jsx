import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import {addContact} from 'redux/contactsSlice'
import * as yup from 'yup';
// import { nanoid } from 'nanoid';

import { Form, Field, FormBtn, ErrorMessage } from './ContactForm.styled';


const ContactSchema = yup.object().shape({
    name: yup.string().trim().matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore dArtagnan').required('Required'),
    number: yup.string().trim().matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').required('Required'),
})

const initialValues = {
    name: '',
    number: '',
}

export const ContactForm = () => {
    const contacts = useSelector(getContacts);
    const dispatch = useDispatch();

      const handleSubmit = (values, { resetForm }) => {
        const check = contacts.filter(
          contact => contact.name.toLowerCase() === values.name.toLowerCase()
        );
        if (check.length) {
          alert(`${values.name} is already in contacts`);
        } else {
          dispatch(addContact(values));
          resetForm({
            name: '',
            number: '',
          });
        }
      };

    return (
    <Formik 
    initialValues={initialValues} 
    validationSchema={ContactSchema}
    // onSubmit = {(contacts, {resetForm}) => {
    //     onSubmit({ ...contacts, id: nanoid(), })
    //     resetForm();
    //         }
      onSubmit={(values, actions) => {
        handleSubmit(values, actions);
      }}>
    
        <Form>
            <label>
                Name
                <Field type="text" name="name" placeholder="enter a name" />
                <ErrorMessage name="name" component="div" />
            </label>

            <label>
                Number
                <Field type="tel" name="number" placeholder="enter the phone number" />
                <ErrorMessage name="number" component="div" />
            </label>
            
            <FormBtn type="submit">Add contact</FormBtn>

        </Form>
    </Formik>
    );
}