import React from 'react';

export default ({ testimonials }) => (
  <div>
    {testimonials.map((testimonial, i) => (
      <article className="message" key={i}>
        <div className="message-body">
          {testimonial.quote}
          <br />
          <cite> – {testimonial.author}</cite>
        </div>
      </article>
    ))}
  </div>
);
