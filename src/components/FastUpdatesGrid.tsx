import React from 'react';
import { BlogPost } from '../types';
import { BlogCard } from './BlogCard';
import { AdSection } from './AdSection';

interface FastUpdatesGridProps {
  regularBlogPosts: BlogPost[];
  setSelectedBlog: (post: BlogPost | null) => void;
}

export const FastUpdatesGrid: React.FC<FastUpdatesGridProps> = ({
  regularBlogPosts,
  setSelectedBlog,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {regularBlogPosts.map((post, index) => (
          <React.Fragment key={`blog-card-${post.id}`}>
            <BlogCard
              post={post}
              onSelectPost={(p) => setSelectedBlog(p)}
            />
            {/* Inject ad card every 6th post */}
            {(index + 1) % 6 === 0 && (
              <div className="col-span-full">
                <AdSection adSlot="1234567890" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
