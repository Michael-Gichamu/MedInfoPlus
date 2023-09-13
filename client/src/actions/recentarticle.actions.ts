export const findMostRecentArticle = (articles: any) => {
  let mostRecentArticle = null;
  let mostRecentDate = new Date(0);

  for (const article of articles) {
    const createdAtDate = new Date(article.created_at);

    if (createdAtDate > mostRecentDate) {
      mostRecentDate = createdAtDate;
      mostRecentArticle = article;
    }
  }

  return mostRecentArticle;
};
