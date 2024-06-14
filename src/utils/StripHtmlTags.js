import React from 'react';

const StripHtmlTags = ({ html, children }) => {
  const strippedHtml = html.replace(/<[^>]*>?/g, '');

  return <>{children ? children(strippedHtml) : strippedHtml}</>;
};

export default StripHtmlTags;