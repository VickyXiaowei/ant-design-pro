export default {
  namespace: 'awsModel',

  state: {
    items: [],
    id: 123,
  },

  reducers: {
    queryItems(state, action) {
      return {
        ...state,
        items: action.payload,
      };
    },
    addItem(state, action) {
      return {
        ...state,
        id: ++action.payload,
      };
    },
  },
};
