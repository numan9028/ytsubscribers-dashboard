export const instagramProxyUrl = (mediaSrc) => {
  const baseUrl = process.env.REACT_APP_INSTA_MEDIA;
  const encodedSrc = encodeURIComponent(mediaSrc);
  return `${baseUrl}${encodedSrc}`;
};

export const createFile = async (url) => {
  if (!url || url === undefined) {
    return false;
  }
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = {
    type: 'image/jpeg'
  };
  const file = new File([data], `${new Date().getTime()}.jpg`, metadata);
  return file;
};
export const createMarkup = (markup) => {
  return { __html: markup ? markup : '' };
};
export const transformNumber = (quantity) => {
  if (quantity >= 1000000000) {
    return `${Math.floor(quantity / 1000000000)}B`; //one billion
  } else if (quantity >= 1000000) {
    return `${Math.floor(quantity / 1000000)}M`; // one million
  } else if (quantity >= 10000) {
    return `${Math.floor(quantity / 1000)}K`; // one k
  } else {
    return quantity;
  }
};

// Form Data
export const createImageFile = async (url) => {
  // url => blog image url
  if (!url || url === undefined) {
    return false;
  }
  const response = await fetch(url);
  const data = await response.blob();
  const metadata = {
    type: 'image/jpeg'
  };
  const file = new File([data], `${new Date().getTime()}.jpg`, metadata);
  return file;
};

export const decodeEntities = (function () {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities(str) {
    if (str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();
