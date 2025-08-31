import "./ArticleGallery.scss";
import React from "react";
import Article from "/src/components/articles/base/Article.jsx";

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 */
function ArticleGallery({ dataWrapper, id }) {
  const images = dataWrapper.settings?.images || [];

  return (
    <Article
      id={dataWrapper.uniqueId || id}
      type={Article.Types.SPACING_DEFAULT}
      dataWrapper={dataWrapper}
      className="article-gallery"
    >
      <div className="article-gallery-items">
        {images.map((imgObj, index) => (
          <ArticleGalleryItem
            key={index}
            img={imgObj.src}
            alt={imgObj.alt}
            title={dataWrapper.locales?.en?.title}
          />
        ))}
      </div>
    </Article>
  );
}

/**
 * @param {String} img
 * @param {String} alt
 * @param {String} title
 * @return {JSX.Element}
 */
function ArticleGalleryItem({ img, alt, title }) {
  return (
    <div className="article-gallery-item">
      <div className="article-gallery-item-avatar-wrapper">
        <img src={img} alt={alt || "Certificate"} />
      </div>
      {title && (
        <div className="article-gallery-item-content">
          <h6
            className="article-gallery-item-content-title"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      )}
    </div>
  );
}

export default ArticleGallery;
