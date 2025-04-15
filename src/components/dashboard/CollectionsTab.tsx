import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyCollectionCard from './EmptyCollectionCard';
import CollectionCard from './CollectionCard';

interface CollectionsTabProps {
  onCreateCollection?: () => void;
}

const CollectionsTab = ({ onCreateCollection }: CollectionsTabProps) => {
  const navigate = useNavigate();

  const handleCreateCollection = () => {
    navigate('/dashboard/collections');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <EmptyCollectionCard onClick={handleCreateCollection} />

        <CollectionCard
          title="Product Documentation"
          description="Technical documentation and user guides for our products"
          icon="box"
          count={{ value: 15, type: 'documents' }}
          createdDate="1 week ago"
          chunks={253}
        />

        <CollectionCard
          title="Marketing Materials"
          description="Blog posts, case studies, and other marketing content"
          icon="bookmark"
          count={{ value: 3, type: 'websites' }}
          createdDate="3 days ago"
          chunks={127}
        />
      </div>
    </div>
  );
};

export default CollectionsTab;
