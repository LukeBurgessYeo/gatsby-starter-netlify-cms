import React from 'react';
import Link from 'gatsby-link';
import Content, { HTMLContent } from '../components/Content';
import Helmet from 'react-helmet';

export const BlogPostTemplate = ({ content, contentComponent, description, title, helmet }) => {
  const PostContent = contentComponent || Content;
  return <section className="section">
    { helmet ? helmet : ""}
    <div className="container content">
      <div className="columns">
        <div className="column is-10 is-offset-1">
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light">{title}</h1>
          <p>{description}</p>
          <PostContent content={content} />
          <hr />
          <Link className="button is-small" to="/">← back</Link>
        </div>
      </div>
    </div>
  </section>;
}

export default ({ data }) => {
  const { markdownRemark: post } = data;
  return <BlogPostTemplate
    content={post.html}
    contentComponent={HTMLContent}
    description={post.frontmatter.description}
    helmet={<Helmet title={`Broo Guud Coffee | ${post.frontmatter.title}`} />}
    title={post.frontmatter.title}
  />;
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`;
