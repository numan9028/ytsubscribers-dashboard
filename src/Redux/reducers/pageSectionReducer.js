import * as types from '../constants/actionTypes';

const initialState = {
  items: [],
  item: {},
  loading: true,
  canonicalLink: '',
  metaDescription: '',
  metaTitle: '',
  sectionMeta: {},
  pageName: '',
  sections: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        item: action.payload,
        canonicalLink: action.payload.canonicalLink,
        sectionMeta: action.payload.sectionMeta,
        loading: false
      };

    case types.GET_PAGED_DATA:
      return {
        ...state,
        item: action.payload,
        loading: false
      };

    case types.SINGLE_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        item: action.payload,
        canonicalLink: action.payload.canonicalLink,
        sectionMeta: action.payload.sectionMeta,
        loading: false
      };
    case types.GET_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        canonicalLink: action.payload.canonicalLink,
        metaDescription: action.payload.metaDescription,
        metaTitle: action.payload.metaTitle,
        id: action.payload._id,
        pageName: action.payload.pageName,
        sections: action.payload.sections,
        loading: false
      };
    case types.UPDATE_PAGE_SECTION_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
