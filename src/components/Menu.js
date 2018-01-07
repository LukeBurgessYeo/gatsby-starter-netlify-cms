import React from 'react';
import Link from 'gatsby-link';

const Menu = (props) => {
  const allMonths = props.data.allMarkdownRemark.edges
    .filter(post => post.node.frontmatter.templateKey === 'blog-post')
    .map(post => post.node.frontmatter.date)
    .map(date => date.split(' ')[0] + ' ' + date.split(' ')[2]);
  const months = Array.from(new Set(allMonths));
  return (
    <aside className="menu">
      <p className="menu-label">
        Pages
      </p>
      <ul className="menu-list">
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      <p className="menu-label">
        Previous Posts
      </p>
      <ul className="menu-list">
        <li>
          <a
            className={(props.month === '') ? "is-active" : ""}
            onClick={() => props.getPosts('')}
          >
            All
          </a>
        </li>
        {months.map((month, i) => (
          <li key={i}>
            <a
              className={(props.month === month) ? "is-active" : ""}
              onClick={() => props.getPosts(month)}
            >
              {month}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Menu;