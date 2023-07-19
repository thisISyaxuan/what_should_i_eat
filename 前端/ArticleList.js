import React from "react";
import './App.css';

class ArticleList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        articles: []
      };
    }
  
    componentDidMount() {
      fetch("https://api.example.com/items")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              articles: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, articles } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <center>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    {articles?.map(article =>(
                        <tbody key={article.id}>
                            <tr>
                                <td>{article.title}</td>
                                <td>{article.body}</td>
                                <td>{article.author}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </center>
        );
      }
    }
  }

  export default ArticleList;