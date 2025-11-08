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
            <ArticlePublicationsList dataWrapper={dataWrapper}
                                     selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
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
        <ul className={`article-publications-list`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticlePublicationsItem itemWrapper={itemWrapper} key={key}/>
            ))}
        </ul>
    )
}

/**
 * @param {ArticleItemDataWrapper} itemWrapper
 * @return {JSX.Element}
 * @constructor
 */
function ArticlePublicationsItem({ itemWrapper }) {
    const handleItemClick = () => {
        if (itemWrapper.link && itemWrapper.link.href) {
            window.open(itemWrapper.link.href, '_blank', 'noopener,noreferrer')
        }
    }

    const hasBadge = itemWrapper.locales.badge

    return (
        <li className={`article-publications-item`} 
            onClick={handleItemClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick()
                }
            }}>
            
            {/* Left icon */}
            <div className={`article-publications-icon`}>
                <i className={itemWrapper.faIcon || 'fa-solid fa-file-alt'}></i>
            </div>

            {/* Main content: title, author, journal */}
            <div className={`article-publications-content`}>
                <h4 className={`article-publications-title`}>
                    {itemWrapper.locales.title || itemWrapper.placeholder}
                </h4>

                {itemWrapper.locales.author && (
                    <p className="article-publications-author">{itemWrapper.locales.author}</p>
                )}

                {itemWrapper.locales.journal && (
                    <p className="article-publications-journal">{itemWrapper.locales.journal}</p>
                )}
            </div>

            {/* Badge / status */}
            {hasBadge && (
                <div className={`article-publications-badge ${itemWrapper.locales.badge?.toLowerCase()}`}>
                    {itemWrapper.locales.badge}
                </div>
            )}

            {/* Optional link icon */}
            {itemWrapper.link && itemWrapper.link.href && (
                <div className={`article-publications-link-icon`}>
                    <i className={`fa-solid fa-arrow-right`}></i>
                </div>
            )}
        </li>
    )
}

/**
 * Trailing empty item for timeline effect
 */
function ArticlePublicationsTrailingItem() {
    return (
        <li className={`article-publications-item article-publications-item-trailing`}>
            <div className={`article-publications-icon`}></div>
        </li>
    )
}

export default ArticlePublication
