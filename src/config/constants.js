const PRODUCTION = true;

const PRODUCT_TYPE = {
  DRY_FLOWER: {
    value: 1,
    label: 'Dry Flower'
  }
};

const USER_POST_TYPE = {
  REVIEW: {
    value: 1,
    label: 'Review'
  },
  NEWS: {
    value: 2,
    label: 'News'
  },
  QUESTION: {
    value: 3,
    label: 'Question'
  },
  DISCUSSION: {
    value: 4,
    label: 'Discussion'
  },
  IMAGES: {
    value: 5,
    label: 'Images'
  }
};

const USER_POST_TYPE_LIST = [
  {
    value: 1,
    label: 'Review',
    color: 'blue'
  },
  {
    value: 2,
    label: 'News',
    color: 'orange'
  },
  {
    value: 3,
    label: 'Question',
    color: 'yellow'
  },
  {
    value: 4,
    label: 'Discussion',
    color: 'green'
  },
  {
    value: 5,
    label: 'Images',
    color: 'red'
  }
];

const LINK_SOURCE_TYPE = {
  OCS: {
    value: 1,
    label: 'OCS'
  }
};

const PRODUCT_ATTRIBUTE_TYPE = [
  {
    value: 1,
    inputValue: 'thc',
    label: 'THC %',
    displayType: 'percentage',
    displayLabel: 'THC',
    userPostType: 'product-review'
  },
  {
    value: 2,
    inputValue: 'cbd',
    label: 'CBD %',
    displayType: 'percentage',
    displayLabel: 'CBD',
    userPostType: 'product-review'
  },
  {
    value: 3,
    inputValue: 'terps',
    label: 'TERPS %',
    displayType: 'percentage',
    displayLabel: 'TERPS',
    userPostType: 'product-review'
  },
  {
    value: 4,
    inputValue: 'packagedDate',
    label: 'Packaged Date',
    displayType: 'date',
    displayLabel: 'Packaged',
    userPostType: 'product-review'
  }
];

const REVIEW_WEBSITE_URL = 'https://reviews.weedstrue.ca';

export {
  PRODUCTION,
  PRODUCT_TYPE,
  USER_POST_TYPE,
  USER_POST_TYPE_LIST,
  LINK_SOURCE_TYPE,
  PRODUCT_ATTRIBUTE_TYPE,
  REVIEW_WEBSITE_URL
};
