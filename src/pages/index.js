import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
import Menu from '../components/Menu';
import headerImg from '../img/IMG_4888.jpg';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: ''
    }
  }

  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  componentDidMount() {
    this.setState({ month: '' });
  }

  filterPosts = (m) => {
    this.setState({ month: m });
  }

  render() {
    let blogs = this.props.data.allMarkdownRemark.edges
      .filter(({ node }) => node.frontmatter.templateKey === 'blog-post');
    if (this.state.month !== '') {
      blogs = blogs.filter(({ node }) => (
        node.frontmatter.date.split(' ')[0] + ' ' + node.frontmatter.date.split(' ')[2]) === this.state.month
      );
    }
    return (
      <div>
      <div>
        <img src={headerImg} />
      </div>
      <section className="section">
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="container">
          <div className="content">
            <h1 className="has-text-weight-bold is-size-2">
              {(this.state.month === '') ? "Latest Posts" : this.state.month}
            </h1>
          </div>
          <div className="columns">
            <div className="column is-three-quarters">
              {blogs.map(({ node: post }) => (
                <div className="content" style={{ border: '1px solid #eaecee', padding: '2em 4em' }} key={post.id}>
                  <p>
                    <Link className="has-text-primary" to={post.frontmatter.path}>
                      {post.frontmatter.title}
                    </Link>
                    <span> &bull; </span>
                    <small>{post.frontmatter.date}</small>
                  </p>
                  <p>
                    {post.excerpt}
                    <br />
                    <br />
                    <Link className="button is-small" to={post.frontmatter.path}>
                      Keep Reading →
                    </Link>
                  </p>
                </div>
              ))}
            </div>
            <div className="column">
              <Menu data={this.props.data} month={this.state.month} getPosts={this.filterPosts}/>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
