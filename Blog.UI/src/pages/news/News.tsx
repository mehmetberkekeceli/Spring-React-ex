import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

function News() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=3d1d863338284ca893adf4310f220cf9`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="news">
      <h1 className="news-header">Dünyadan Teknoloji Haberleri</h1>
      {loading ? (
        <ProgressSpinner />
      ) : (
        <div className="news-grid">
          {articles.length > 0 ? (
            articles.map(
              (article) =>
                article.urlToImage && (
                  <Card key={article.title} className="news-card">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="news-image"
                    />
                    <h2>{article.title}</h2>
                    <p>{article.description}</p>
                    <Button
                      label="Devamını Oku!"
                      icon="pi pi-arrow-right"
                      className="p-button-link"
                      onClick={() => window.open(article.url, "_blank")}
                    />
                  </Card>
                )
            )
          ) : (
            <p>Haberler bulunamadı.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default News;
