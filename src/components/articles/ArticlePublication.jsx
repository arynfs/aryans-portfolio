import "./ArticlePublication.scss"
import React, { useState } from 'react'
import Article from "/src/components/articles/base/Article.jsx"

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

function getInitials(name) {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .map(part => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
}

function ArticlePublicationsItem({ itemWrapper }) {
    const [copied, setCopied] = useState(false)

    const publication = itemWrapper.publication || {}
    const authors = publication.authors || []
    const href = itemWrapper.link?.href
    const title = (itemWrapper.locales.title || itemWrapper.placeholder || "").trim()

    const handleShare = async () => {
        const url = href || window.location.href
        try {
            if (navigator.share) {
                await navigator.share({ title, url })
                return
            }
            await navigator.clipboard.writeText(url)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (e) { /* user cancelled or clipboard unavailable */ }
    }

    const meta = [publication.date, publication.venue].filter(Boolean)

    return (
        <li className={`article-publications-item`}>
            <h4 className={`article-publications-title`}>
                {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
                ) : title}
            </h4>

            {(publication.type || meta.length > 0) && (
                <div className={`article-publications-meta`}>
                    {publication.type && (
                        <span className={`article-publications-type article-publications-type-${publication.type.toLowerCase()}`}>
                            {publication.type}
                        </span>
                    )}
                    {meta.length > 0 && (
                        <span className={`article-publications-date`}>{meta.join(" · ")}</span>
                    )}
                </div>
            )}

            {authors.length > 0 && (
                <ul className={`article-publications-authors`}>
                    {authors.map((author, i) => (
                        <li key={i} className={`article-publications-author`}>
                            <span className={`article-publications-avatar`}>{getInitials(author)}</span>
                            <span>{author}</span>
                        </li>
                    ))}
                </ul>
            )}

            <div className={`article-publications-actions`}>
                {href ? (
                    <a className={`article-publications-btn article-publications-btn-primary`}
                       href={href}
                       target="_blank"
                       rel="noopener noreferrer">
                        View
                    </a>
                ) : (
                    <span className={`article-publications-btn article-publications-btn-primary disabled`}>
                        Coming soon
                    </span>
                )}

                <button type="button"
                        className={`article-publications-btn article-publications-btn-secondary`}
                        onClick={handleShare}>
                    {copied ? "Link copied" : "Share"}
                </button>
            </div>
        </li>
    )
}

export default ArticlePublication
