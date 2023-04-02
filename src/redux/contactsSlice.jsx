import { createSlice. nanoid } from '@reduxjs/toolkit';


const contactsSlice = createSlice({
  name: 'contacts',
  initialState:[],
    reducers: {
        addContact: { reduser(state, action) {
        state.push(action.payload);
        },
    prepare(newContact) {
        return {
          payload: {
            ...newContact,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(({id}) => id === action.payload);
      state.splice(index, 1);
    },
    // filterContact(state, action) {
    //   for (const task of state) {
    //     if (task.id === action.payload) {
    //       task.completed = !task.completed;
    //       break;
    //     }
    //   }
    // },
  },
});

export const { addContact, deleteContact, filterContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;