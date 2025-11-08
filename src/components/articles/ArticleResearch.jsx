import "./ArticlePublication.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublication({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-publications`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}
                 data-section="publications">
            <ArticlePublicationsHeader dataWrapper={dataWrapper}/>
            <ArticlePublicationsList dataWrapper={dataWrapper}
                                     selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublicationsHeader({ dataWrapper }) {
    return (
        <div className={`article-publications-header`}>
            <h3>{dataWrapper.locales.title || 'Publications'}</h3>
            <i className={`fa-regular fa-file-lines publications-icon`}></i>
        </div>
    )
}

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {String} selectedItemCategoryId
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublicationsList({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <div className={`article-publications-list`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticlePublicationsItem itemWrapper={itemWrapper} 
                                         key={key}/>
            ))}
        </div>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper - This wrapper is key.
 *                                              It likely provides locale-resolved data.
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublicationsItem({ itemWrapper }) {
    const handleItemClick = () => {
        if (itemWrapper.link && itemWrapper.link.href) {
            window.open(itemWrapper.link.href, '_blank', 'noopener,noreferrer')
        }
    }

    // Attempt to get locale-specific data.
    // Assuming 'itemWrapper' itself holds the current locale's content directly,
    // or has a property that does, or we default to 'en'.
    // The previous error suggests itemWrapper.locales.en was the way to go.
    // Let's explicitly try to access 'en' again, but with a safety check.
    const currentLocaleData = itemWrapper.locales?.en || itemWrapper.locales; // Fallback to itemWrapper.locales if .en isn't present
    
    // Safely extract properties
    const title = currentLocaleData?.title || itemWrapper.placeholder;
    const badgeText = currentLocaleData?.badge;
    const authorName = currentLocaleData?.author;

    // Create a dynamic class name for the badge based on its text
    const badgeClassName = badgeText ? 
        `article-publications-badge ${badgeText.toLowerCase().replace(/\s/g, '-')}` : '';

    return (
        <div className={`article-publications-item`} 
             onClick={handleItemClick}
             role="button"
             tabIndex={0}
             onKeyPress={(e) => {
                 if (e.key === 'Enter' || e.key === ' ') {
                     handleItemClick()
                 }
             }}>
            <div className={`article-publications-icon`}>
                <i className={itemWrapper.faIcon || 'fa-solid fa-file-alt'}></i>
            </div>

            <div className={`article-publications-content`}>
                <div className={`article-publications-title-wrapper`}>
                    <h4>{title}</h4>
                    {badgeText && (
                        <div className={badgeClassName}>
                            {badgeText}
                        </div>
                    )}
                </div>
                {authorName && (
                    <p className="article-publications-author">{authorName}</p>
                )}
            </div>

            {itemWrapper.link && itemWrapper.link.href && (
                <div className={`article-publications-link-icon`}>
                    <i className={`fa-solid fa-arrow-right`}></i>
                </div>
            )}
        </div>
    )
}

export default ArticlePublication