import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

const TestimonialCard = ({ quote, author, role, company, image }: TestimonialCardProps) => {
  return (
    <div className="bg-neutral-900 rounded-xl p-6 border border-neutral-800">
      <blockquote className="text-lg text-neutral-300 mb-6">{quote}</blockquote>
      <div className="flex items-center gap-3">
        {image ? (
          <img src={image} alt={author} className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center">
            <span className="text-white font-medium">{author.charAt(0)}</span>
          </div>
        )}
        <div>
          <div className="font-medium text-white">{author}</div>
          <div className="text-sm text-neutral-400">
            {role} of {company}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
